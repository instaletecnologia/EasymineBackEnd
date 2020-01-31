'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquipmentControlHour extends Model {

  static boot () {
    super.boot()
    //Será dispardo evento inserir a ocorrencia de manutenção na tabela
    //man.equipamentoManutencoes utilizada no modulo de manutenção e no modulo de serviços
    this.addHook('afterCreate', 'EquipmentControlHourHook.insertMaintenanceEquipment')
  }

  static get table () {
    return 'dbo.ControleHoras'
  }

  static get primaryKey () {
    return 'ControleHoraID'
  }

  static get incrementing () {
    return false
  }

  static get createdAtColumn () {
    return null
  }

  static get updatedAtColumn () {
    return null
  }


  static get visible(){
    return [
      'ControleHoraID'
      ,'EquipamentoID'
      ,'OcorrenciaID'
      ,'LoginID'
      ,'OperacaoID'
      ,'DataHoraInicio'
      ,'DataHoraTermino'
      ,'Latitude'
      ,'Longitude'
      ,'Altitude'
      ,'DMT'
      ,'KmAtual'
      ,'Peso'
      ,'DentroDaCerca'
      ,'SensorID'
      ,'Valor'
      ,'ValorTipo'
      ,'Horímetro'
      ,'Ok'
      ,'Cheio'
      ,'GeomFeatureID'
      ,'DMTCiclo'
      ,'OcorrenciaTipoID'
      ,'DataCadastro'
      ,'JustificativaID'
      ,'Obs'
      ,'Logado'
      ,'FrenteID'
      ,'HorimetroTelemetria'
      ,'LocalFrenteDestinoID'
      ,'EquipamentoRefID'
      ,'LocalFrenteOrigemID'
      ,'UsuarioAtualizaID'
      ,'DataAlteracao'
      ,'LastEditDate'
      ,'CreationDate'
      ,'KmH'
      ,'IdPilha'
      ,'IdRange'
      ,'IDTurno'
      ,'OperadorID'
    ]
  }

}

module.exports = EquipmentControlHour
