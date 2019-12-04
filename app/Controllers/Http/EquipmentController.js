'use strict'

const Defaults = use('App/Defaults/Dates')
const Equipment = use('App/Models/Equipamento')
const NewcurrentDate = Defaults.currentDate()

class EquipmentController {

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
      'UsuarioRegistroID': auth.user.UsuarioID,,
      'UsuarioAtualizaID': auth.user.UsuarioID,,
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
