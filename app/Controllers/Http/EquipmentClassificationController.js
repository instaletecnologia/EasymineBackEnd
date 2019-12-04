'use strict'

const Defaults = use('App/Defaults/Dates')
const EquipmentClassification = use('App/Models/EquipamentoClassificacao')
const NewcurrentDate = Defaults.currentDate()

class EquipmentClassificationController {

  async index ({ request, response, view }) {
    let { page, perPage } = request.all()

    const equipmentClassifications = await EquipmentClassification.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return equipmentClassifications
  }

  async store({ request, auth }){

    const data = request.only([
      'description',
    ])

    const equipmentClassification = await EquipmentClassification.create({
      'Descricao' : data.description,
      'Ativo': true,
      'UsuarioRegistroID': auth.user.UsuarioID,
      'UsuarioAtualizaID' : auth.user.UsuarioID,
      'DataCadastro'   : NewcurrentDate,
      'DataAtualizacao': NewcurrentDate,
      'LastEditDate'   : NewcurrentDate,
      'CreationDate'   : NewcurrentDate,
    })

     return equipmentClassification
  }

  async show ({ params }) {
    const equipmentClassification = await EquipmentClassification.findOrFail(params.id)

    return equipmentClassification
  }

  async update ({ params, request, response, auth }) {
    const equipmentClassification = await EquipmentClassification.findOrFail(params.id)
    const data = request.only(['description', 'active'])

    const dataTranslated = {
      'Descricao': data.description,
      'Ativo': data.active,
      'UsuarioAtualizaID': auth.user.UsuarioID,
      'DataAtualizacao': NewcurrentDate,
      'LastEditDate': NewcurrentDate,
    }
    equipmentClassification.merge(dataTranslated)

    await equipmentClassification.save()

    return equipmentClassification

  }

  async destroy ({ params, response }) {
    return response.status('401').send({ error: {message: 'Unable to delete the registration, disable it.'} })
  }

}

module.exports = EquipmentClassificationController
