'use strict'

const Defaults = use('App/Defaults/Dates')
const EquipmentRenting = use('App/Models/EquipamentoLocatorio')
const NewcurrentDate = Defaults.currentDate()

class EquipmentRentingController {

  async index ({ request, response, view }) {
    let { page, perPage } = request.all()

    const equipmentRenting = await EquipmentRenting.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return EquipmentRenting
  }

  async store({ request, auth }){

    const data = request.only([
      'description',
    ])

    const equipmentRenting = await EquipmentRenting.create({
      'Descricao' : data.description,
      'Ativo': true,
      'UsuarioRegistroID': auth.user.UsuarioID,
      'UsuarioAtualizaID' : auth.user.UsuarioID,
      'DataCadastro'   : NewcurrentDate,
      'DataAtualizacao': NewcurrentDate,
    })

     return equipmentRenting
  }

  async show ({ params }) {
    const equipmentRenting = await EquipmentRenting.findOrFail(params.id)

    return equipmentRenting
  }

  async update ({ params, request, response, auth }) {
    const equipmentRenting = await EquipmentRenting.findOrFail(params.id)
    const data = request.only(['description', 'active'])

    const dataTranslated = {
      'Descricao' : data.description,
      'Ativo': data.active,
      'UsuarioAtualizaID' : auth.user.UsuarioID,
      'DataAtualizacao': NewcurrentDate,
    }
    equipmentRenting.merge(dataTranslated)

    await equipmentRenting.save()

    return equipmentRenting

  }

  async destroy ({ params, response }) {
    return response.status('401').send({ error: {message: 'Unable to delete the registration, disable it.'} })
  }
}

module.exports = EquipmentRentingController
