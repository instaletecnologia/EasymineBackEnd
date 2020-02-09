'use strict'

const FailureClass = use('App/Models/ClassesFalha')
const FailureClassTimeCategory = use('App/Models/ClassesFalhasCategoriasTempo')
const Database = use('Database')

class MaintenanceFailureClassController {

  async index ({ request, response, view }) {
    let { page, perPage } = request.all()

    const failureClass = await FailureClass.query().paginate(page ? page : 1, perPage ? perPage : 20)

    return failureClass
  }

  async show ({ params }) {
    const failureClass = await FailureClass.query()
    .where('Ativo', true)
    .where('ClasseFalhaID', params.id)
    .orderBy('Descricao', 'desc')
    .fetch()

    return failureClass
  }

  async showFailureClassTimeCategory ({ request, response }) {

    const {  EquipamentoID, idCategoriasTempo, ParentID  } = request.all()

    let categoryTime = 0

    if (ParentID === null) {
      categoryTime = idCategoriasTempo
    } else {
      categoryTime = ParentID
    }
    console.log(ParentID);
    console.log(idCategoriasTempo);

   const failureClassTimeCategory = await Database
   .select('man.ClassesFalhas.ClasseFalhaID','man.ClassesFalhas.Descricao')
   .from('man.ClassesFalhasCategoriasTempos')
   .innerJoin('man.ClassesFalhas', 'man.ClassesFalhas.ClasseFalhaID', 'man.ClassesFalhasCategoriasTempos.ClasseFalhaID')
   .where({ 'man.ClassesFalhas.Ativo': true })
   .where({'man.ClassesFalhasCategoriasTempos.CategoriaTempoID': categoryTime})

   return failureClassTimeCategory
  }

}

module.exports = MaintenanceFailureClassController
