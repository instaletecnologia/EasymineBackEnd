'use strict'

const Antl = use('Antl')

class EquipmentProprietary {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      description : 'required|unique:dbo.EquipamentosProprietarios, Descricao',
    }
  }

  get messages () {
    return Antl.list('validation')
 }

}

module.exports = EquipmentProprietary
