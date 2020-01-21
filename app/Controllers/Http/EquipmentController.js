'use strict'

const Database = use('Database')
const Env = use('Env')
const Drive = use('Drive')
const Helpers = use('Helpers')
const Defaults = use('App/Defaults/Dates')
const Equipment = use('App/Models/Equipamento')
const NewcurrentDate = Defaults.currentDate()

class EquipmentController {

  async initialLoad({ request, response }) {

    const { EquipamentoID, EquipamentoTipoID } = request.all()

    const userQuery = await Database.raw(
      `
      SELECT 
        UsuarioID as usuarioID,
        Nome as nome,
        UsuarioSetorID as usuarioSetorID,
        Chapa as chapa,
        Senha as senha,
        UsuarioPermissaoID as usuarioPermissaoID,
        LastEditDate as lastEditDate,
        Login as login,
        TipoLogin as tipoLogin,
        Ativo as ativo
      FROM 
        Usuarios WITH (NOLOCK)
      ORDER BY 
        UsuarioID
      `
    )

    const checklistQuery = await Database.raw(
      `
      SELECT 
        CheckListID,
        EquipamentoTipoID,
        Descricao,
        Ativo,
        Tipo,
        ISNULL(InviabilizaOperacao,0) as InviabilizaOperacao
	    FROM 
			  CheckLists c (NOLOCK) 
	    WHERE  
        EquipamentoTipoID = ${EquipamentoTipoID}
        AND Ativo = 1
      ORDER BY 
        CheckListID
      `
    )

    const checkListIds = checklistQuery.map(({ CheckListID }) => CheckListID).join(',')

    const checkListNonConformitiesQuery = await Database.raw(
      `
      SELECT   
        co.CheckListConformidadeID, 
        co.CheckListID, co.Descricao, 
        co.Ok, 
        co.Ativo, 
        co.Inopera, 
        co.ChekListCriterioID, 
        co.Urgencia 
      FROM 
        CheckListConformidades co (NOLOCK) 
      INNER JOIN CheckLists cl (NOLOCK) on cl.CheckListID = co.CheckListID
      WHERE 
        co.Ok = 0 AND cl.ChecKlistID IN (${checkListIds})
      `
    )

    const checklistConformitiesQuery = await Database.raw(
      `
      SELECT 
        l.CheckListLanctoID,
        l.CheckListID,
        l.EquipamentoID,
        l.LoginID,
        l.DataCadastro,
        l.CheckListConformidadeID,
        l.SituacaoInicial,
        l.DataConferenciaInicial,
        l.SituacaoFinal,
        l.DataConferenciaFinal,
        l.CheckListConformidadeIDFinal,
        l.CreationDate,
        l.Observacao,
        l.UsuarioAtualizaID
      FROM 
        CheckListLancamentos l (NOLOCK)
        INNER JOIN CheckLists c (NOLOCK) on c.CheckListID = l.CheckListID and EquipamentoTipoID = c.EquipamentoTipoID
      WHERE 
        1=1
			  AND EquipamentoID = ${EquipamentoID}
        AND CheckListLanctoID in (
          SELECT MIN(CheckListLanctoID) as CheckListLanctoID
					from CheckListLancamentos
          where 
            1=1 
						AND SituacaoInicial = 0
						AND EquipamentoID = ${EquipamentoID}
						AND SituacaoFinal is null
          GROUP BY EquipamentoID, CheckListID
        )
	      ORDER BY 
			    CheckListLanctoID
      `
    )

    const occurrencesQuery = await Database.raw(
      `
      SELECT
        o.[OcorrenciaID],
        o.[OcorrenciaTipoID],
        ot.descricao as OcorrenciaDescricao,
        ctp.[idCategoriasTempo] as CategoriaTempoID,
        ctp.Cod as CategoriaTempoCod,
        SUBSTRING(ctp.Cod, 1, 2) AS CategoriaTempoCodPai,
        o.[Nextocorrencias],
        o.[EquipamentoTipoID],
        o.[Ativo],
        o.[DataCadastro],
        o.[DataAlteracao],
        o.[UsuarioRegistroID],
        o.[UsuarioAtualizaID],
        CAST(N'' AS XML).value('xs:base64Binary(xs:hexBinary(sql:column("o.[Imagem]")))', 'NVARCHAR(MAX)') [Imagem],
        CAST(null as varbinary) as [ImagemTransicao],
        o.[SairDoSistema],
        o.[TempoMaximoMinutos],
        o.[TempoMaximoOcorrenciaID],
        o.[DesligarSistema],
        o.[ChecklistSaida],
        o.[SolicitarHorimetro]
      FROM ocorrencias as o with (nolock)
      INNER JOIN ocorrenciasTipos as ot with (nolock) on ot.OcorrenciaTipoID = o.OcorrenciaTipoID
      INNER JOIN CategoriasTempo as ct with (nolock) on ct.idCategoriasTempo = o.idCategoriasTempo
      LEFT JOIN CategoriasTempo as ctp with (nolock) on ctp.idCategoriasTempo = ct.ParentID
      WHERE 
        o.equipamentoTipoID = ${EquipamentoTipoID} 
	      AND (o.Ativo = 1) 
	      AND (o.Acao = 'M')
      ORDER BY o.[CicloOrdenacao]
      `
    )

    const operationQuery = await Database.raw(
      `
      SELECT 
        op.OperacaoID,
        op.FrenteID,
        f.Descricao as FrenteDescricao,
        fo.Descricao as FrenteLocalOrigem,
        fd.Descricao as FrenteLocalDestino,
        cast( null as int) as EquipamentoCargaID,
        cast( null as varchar(100)) as TagCarga
      FROM dbo.Operacoes as op 
      INNER JOIN frentes as f on f.frenteID = op.frenteID
      LEFT JOIN [dbo].[FrentesLocais] as fo on fo.FrenteLocalID = f.FrenteLocalOrigemID
      LEFT JOIN [dbo].[FrentesLocais] as fd on fd.FrenteLocalID = f.FrenteLocalDestinoID
      WHERE 
        op.equipamentoid = ${EquipamentoID} 
        AND op.datafim IS NULL
      `
    )
    
    const data = {
      userQuery,
      checklistQuery,
      checkListNonConformitiesQuery,
      checklistConformitiesQuery,
      operationQuery,
      occurrencesQuery,
      realtime: Env.get('MICROSERVICE_REALTIME'),
    }
    const fileName = (new Date()).getTime()
    const downloadUrl = `${Env.get('APP_URL')}/api/v1/equipments/file-download`
    await Drive.put(`initial-load/${fileName}.json`, Buffer.from(JSON.stringify(data)))

    return response.send({ fileId: fileName, downloadUrl })

  }

  async fileDownload({ response, request }){

    const { fileId } = request.all()
    return response.attachment(Helpers.tmpPath(`initial-load/${fileId}.json`))

  }

  async fileDownloadDelete({ response, request }){

    const { fileId } = request.all()
    await Drive.delete(`initial-load/${fileId}.json`)
    return response.send({ ok: true })

  }

  async index ({ request, response, view }) {
    let { page, perPage } = request.all()

    const equipment = await Equipment.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return equipment
  }

  async store({ request, auth }){

    const data = request.only([
      ,'PrefixTag' // [TagPrefixo]
      ,'TagNumber' // [TagNumero]
      ,'Board'      // [Placa]
      ,'CapacityLoad' // [CapacidadeCarga]
      ,'CapacityTank' // [CapacidadeTanque]
      ,'CapacityShell' // [CapacidadeConcha]
      ,'LoadMining' // [CargaMinerio]
      ,'LoadSteril' // [CargaEsteril]
      ,'TaraNominal' // [TaraNominal]
      ,'Year' // [Ano]
      ,'Chassis' // [Chassis]
      ,'LitersTime' // [LitrosHora]
      ,'Hourmeter' // [Horimetro]
      ,'Odometer' // [Odometro]
      ,'CodSAP'
      ,'M3'
      ,'EquipmentTypeTrackingID' // [EquipamentoTipoRastreamentoID]
      ,'EquipmentTypeID' // [EquipamentoTipoID]
      ,'EquipmentClassificationID' // [EquipamentoClassificacaoID]
      ,'EquipmentModelID' // [EquipamentoModeloID]
      ,'EquipmentLocatorID' // [EquipamentoLocatarioID]
      ,'EquipmentOwnerID' // [EquipamentoProprietarioID]
    ])

    const equipment = await Equipment.create({
      'TagPrefixo': data.PrefixTag,
      'TagNumero': data.TagNumber,
      'Placa': data.Board,
      'CapacidadeCarga': data.CapacityLoad,
      'CargaMinerio': data.LoadMining,
      'CargaEsteril': data.LoadSteril,
      'TaraNominal': data.TaraNominal,
      'Ano': data.Year,
      'Chassis': data.Chassis,
      'EquipamentoTipoID': data.EquipmentTypeID,
      'EquipamentoClassificacaoID': data.EquipmentClassificationID,
      'EquipamentoModeloID': data.EquipmentModelID,
      'EquipamentoLocatarioID': data.EquipmentLocatorID,
      'EquipamentoProprietarioID': data.EquipmentOwnerID,
      'Horimetro': data.Hourmeter,
      'Odometro': data.Odometer,
      'Latitude': 0,
      'Longitude': 0,
      'Altitude': 0,
      'UsuarioRegistroID': auth.user.UsuarioID,
      'UsuarioAtualizaID': auth.user.UsuarioID,
      'DataRegistro': NewcurrentDate,
      'DataAlteracao': NewcurrentDate,
      'Ativo': true,
      'IP': '0.0.0.0',
      'IPBullet':'0.0.0.0',
      'Velocidade': 0,
      'MAC': '0.0.0.0',
      'LastEditDate': NewcurrentDate,
      'CreationDate': NewcurrentDate,
      'CodSAP': data.CodSAP,
      'CapacidadeTanque': data.CapacityTank,
      'ControleHoraID': 0,
      'M3': data.M3,
      'OcorrenciaTipoID': 0,
      'EquipamentoTipoRastreamentoID': data.EquipmentTypeTrackingID,
      'Descricao': null,
      'BitmapEquipamento': null,
      'LitrosHora': data.LitersTime,
      'CapacidadeConcha': data.CapacityShell
    })

     return equipmentBrands
  }

  async show ({ params }) {
    const equipment = await Equipment.findOrFail(params.id)

    return equipment
  }

  async update ({ params, request, response, auth }) {
    const equipmentBrands = await EquipmentBrands.findOrFail(params.id)
    const data = request.only([
      ,'PrefixTag' // [TagPrefixo]
      ,'TagNumber' // [TagNumero]
      ,'Board'      // [Placa]
      ,'CapacityLoad' // [CapacidadeCarga]
      ,'CapacityTank' // [CapacidadeTanque]
      ,'CapacityShell' // [CapacidadeConcha]
      ,'LoadMining' // [CargaMinerio]
      ,'LoadSteril' // [CargaEsteril]
      ,'TaraNominal' // [TaraNominal]
      ,'Year' // [Ano]
      ,'Chassis' // [Chassis]
      ,'LitersTime' // [LitrosHora]
      ,'Hourmeter' // [Horimetro]
      ,'Odometer' // [Odometro]
      ,'CodSAP'
      ,'M3'
      ,'EquipmentTypeTrackingID' // [EquipamentoTipoRastreamentoID]
      ,'EquipmentTypeID' // [EquipamentoTipoID]
      ,'EquipmentClassificationID' // [EquipamentoClassificacaoID]
      ,'EquipmentModelID' // [EquipamentoModeloID]
      ,'EquipmentLocatorID' // [EquipamentoLocatarioID]
      ,'EquipmentOwnerID' // [EquipamentoProprietarioID]
      ,'active'
    ])

    const dataTranslated = {
      'TagPrefixo': data.PrefixTag,
      'TagNumero': data.TagNumber,
      'Placa': data.Board,
      'CapacidadeCarga': data.CapacityLoad,
      'CargaMinerio': data.LoadMining,
      'CargaEsteril': data.LoadSteril,
      'TaraNominal': data.TaraNominal,
      'Ano': data.Year,
      'Chassis': data.Chassis,
      'EquipamentoTipoID': data.EquipmentTypeID,
      'EquipamentoClassificacaoID': data.EquipmentClassificationID,
      'EquipamentoModeloID': data.EquipmentModelID,
      'EquipamentoLocatarioID': data.EquipmentLocatorID,
      'EquipamentoProprietarioID': data.EquipmentOwnerID,
      'Horimetro': data.Hourmeter,
      'Odometro': data.Odometer,
      'UsuarioAtualizaID': auth.user.UsuarioID,
      'DataAlteracao': NewcurrentDate,
      'CodSAP': data.CodSAP,
      'CapacidadeTanque': data.CapacityTank,
      'M3': data.M3,
      'EquipamentoTipoRastreamentoID': data.EquipmentTypeTrackingID,
      'LitrosHora': data.LitersTime,
      'CapacidadeConcha': data.CapacityShell,
      'Ativo': data.active,
    }
    equipmentBrands.merge(dataTranslated)

    await equipmentBrands.save()

    return equipmentBrands

  }

  async destroy ({ params, response }) {
    return response.status('401').send({ error: {message: 'Unable to delete the registration, disable it.'} })
  }


}

module.exports = EquipmentController