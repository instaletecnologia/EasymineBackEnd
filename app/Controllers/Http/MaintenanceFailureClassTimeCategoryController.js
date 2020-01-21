'use strict'

const FailureClassTimeCategory = use('App/Models/ClassesFalhasCategoriasTempo')
class MaintenanceFailureClassTimeCategoryController {

  async index ({ request, response, view }) {
    let { page, perPage } = request.all()

    const failureClassTimeCategory = await FailureClassTimeCategory.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return failureClassTimeCategory
  }

  async show ({ params }) {
    const failureClassTimeCategory = await FailureClassTimeCategory.query()
    .with('ClassesFalha', (builder) => {
      builder.where('Ativo', true)
    })
    .where('ClasseFalhaID', params.id)
    .fetch()

    return failureClassTimeCategory
  }

}

module.exports = MaintenanceFailureClassTimeCategoryController
