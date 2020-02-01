'use strict'

const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate()
const EquipmentOperation = use('App/Models/EquipmentOperation')
const RulesBusinessEquipmentOperation = use('App/RulesBusiness/RulesBusinessEquipmentOperation')
const Database = use('Database')

class EquipmentOperationController {

  async index ({ request, response, view }) {
    let { page, perPage } = request.all()

    const equipmentOperation = await EquipmentOperation.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return equipmentOperation
  }

  async store({ request, auth }){
    const data = request.only([
      'description',
    ])
    return RulesBusinessEquipmentOperation.OperationInsert(data)

  }

  async show ({ params }) {
    const equipmentClassification = await EquipmentClassification.findOrFail(params.id)

    return equipmentClassification
  }

  async update ({ params, request, response, auth }) {
    const data = request.only(['description', 'active'])
    return RulesBusinessEquipmentOperation.OperationUpdate(data)
  }

}

module.exports = EquipmentOperationController
