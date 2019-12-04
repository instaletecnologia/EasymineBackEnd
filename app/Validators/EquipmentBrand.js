'use strict'

const Antl = use('Antl')

class EquipmentBrand {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      description : 'required|unique:dbo.EquipamentosMarcas, Descricao',
    }
  }

  get messages () {
    return Antl.list('validation')
 }

}

module.exports = EquipmentBrand
