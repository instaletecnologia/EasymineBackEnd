'use strict'

const Antl = use('Antl')

class EquipmentRenting {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      description : 'required|unique:dbo.EquipamentosAlocador, Descricao',
    }
  }

  get messages () {
    return Antl.list('validation')
 }

}

module.exports = EquipmentRenting
