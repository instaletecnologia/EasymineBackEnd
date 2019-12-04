'use strict'
const Defaults = use('App/Defaults/Dates')
const EquipmentProprietary  = use('App/Models/EquipamentoProprietario')
const NewcurrentDate = Defaults.currentDate()

class EquipmentProprietaryController {
  async index ({ request, response, view }) {
    let { page, perPage } = request.all()

    const equipmentProprietary = await EquipmentProprietary.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return equipmentProprietary
  }

  async store({ request, auth }){

    const data = request.only([
      'description',
      'conditionID',
      'features',
    ])

    const equipmentProprietary = await EquipmentProprietary.create({
      'Descricao' : data.description,
      'Ativo': true,
      'UsuarioRegistroID': auth.user.UsuarioID,
      'UsuarioAtualizaID' : auth.user.UsuarioID,
      'DataCadastro'   : NewcurrentDate,
      'DataAtualizacao': NewcurrentDate,
      'CondicaoID': data.conditionID,
      'Caracteristicas': data.features,
    })

     return equipmentProprietary
  }

  async show ({ params }) {
    const equipmentProprietary = await equipmentProprietary.findOrFail(params.id)

    return equipmentProprietary
  }

  async update ({ params, request, response, auth }) {
    const equipmentProprietary = await EquipmentProprietary.findOrFail(params.id)
    const data = request.only([
    'description',
    'conditionID',
    'features',
    'active'])

    const dataTranslated = {
      'Descricao': data.description,
      'Ativo': data.active,
      'UsuarioAtualizaID': auth.user.UsuarioID,
      'DataAtualizacao': NewcurrentDate,
      'CondicaoID': data.conditionID,
      'Caracteristicas': data.features,
    }
    equipmentProprietary.merge(dataTranslated)

    await equipmentProprietary.save()

    return equipmentProprietary

  }

  async destroy ({ params, response }) {
    return response.status('401').send({ error: {message: 'Unable to delete the registration, disable it.'} })
  }
}

module.exports = EquipmentProprietaryController
