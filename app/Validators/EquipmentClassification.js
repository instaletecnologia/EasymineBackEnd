'use strict'

const Antl = use('Antl')

class EquipmentClassification {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      description : 'required|unique:dbo.EquipamentosClassificacoes, Descricao',
    }
  }

  get messages () {
    return Antl.list('validation')
 }
}

module.exports = EquipmentClassification



