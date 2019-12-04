'use strict'

const Defaults = use('App/Defaults/Dates')
const EquipmentBrands = use('App/Models/EquipamentoModeloMarca')
const NewcurrentDate = Defaults.currentDate()
class EquipmentBrandController {

  async index ({ request, response, view }) {
    let { page, perPage } = request.all()

    const equipmentBrands = await EquipmentBrands.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return equipmentBrands
  }

  async store({ request, auth }){

    const data = request.only([
      'description',
    ])

    const equipmentBrands = await EquipmentBrands.create({
      'Descricao' : data.description,
      'Ativo': true,
      'UsuarioRegistroID': auth.user.UsuarioID,
      'UsuarioAtualizaID' : auth.user.UsuarioID,
      'DataCadastro'   : NewcurrentDate,
      'DataAtualizacao': NewcurrentDate,
      'LastEditDate'   : NewcurrentDate,
      'CreationDate'   : NewcurrentDate,
    })

     return equipmentBrands
  }

  async show ({ params }) {
    const equipmentBrands = await EquipmentBrands.findOrFail(params.id)

    return equipmentBrands
  }

  async update ({ params, request, response, auth }) {
    const equipmentBrands = await EquipmentBrands.findOrFail(params.id)
    const data = request.only(['description', 'active'])

    const dataTranslated = {
      'Descricao': data.description,
      'Ativo': data.active,
      'UsuarioAtualizaID': auth.user.UsuarioID,
      'DataAtualizacao': NewcurrentDate,
    }
    equipmentBrands.merge(dataTranslated)

    await equipmentBrands.save()

    return equipmentBrands

  }

  async destroy ({ params, response }) {
    return response.status('401').send({ error: {message: 'Unable to delete the registration, disable it.'} })
  }

}

module.exports = EquipmentBrandController
