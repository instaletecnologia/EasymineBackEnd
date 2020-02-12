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

    let categoryTimeID = 0

    if (ParentID == 3) {
      categoryTimeID = idCategoriasTempo;
    } else {
      categoryTimeID = ParentID;
    }

   const failureClassTimeCategory = await Database
   .select('man.ClassesFalhas.ClasseFalhaID', 'man.ClassesFalhas.Descricao')
   .from('man.ClassesFalhas')
   .innerJoin('man.ClassesFalhasCategoriasTempos', 'man.ClassesFalhasCategoriasTempos.ClasseFalhaID' ,'man.ClassesFalhas.ClasseFalhaID')
   .innerJoin('man.ManutencaoItens', 'man.ClassesFalhas.ClasseFalhaID', 'man.ManutencaoItens.ClasseFalhaID')
   .innerJoin('man.ManutencaoItensEquipamentosModelos', 'man.ManutencaoItensEquipamentosModelos.ManutencaoItenID', 'man.ManutencaoItens.ManutencaoItenID')
   .innerJoin('dbo.Equipamentos', 'dbo.Equipamentos.EquipamentoModeloID', 'man.ManutencaoItensEquipamentosModelos.EquipamentoModeloID')
   .where({ 'man.ClassesFalhas.Ativo': true })
   .where({'man.ClassesFalhasCategoriasTempos.CategoriaTempoID': categoryTimeID})
   .where({ 'dbo.Equipamentos.EquipamentoID': EquipamentoID })

   //SELECT *
   //FROM man.ClassesFalhas AS CF
   //INNER JOIN man.ClassesFalhasCategoriasTempos AS CFC ON CFC.ClasseFalhaID = CF.ClasseFalhaID
   //INNER JOIN man.ManutencaoItens AS MI ON CF.ClasseFalhaID = MI.ClasseFalhaID
   //INNER JOIN man.[ManutencaoItensEquipamentosModelos] AS MIEM ON MIEM.ManutencaoItenID = MI.ManutencaoItenID
   //INNER JOIN dbo.Equipamentos AS E ON E.EquipamentoModeloID = MIEM.EquipamentoModeloID
   //WHERE CF.Ativo = 1
   //AND E.EquipamentoID = 1
   //AND CFC.CategoriaTempoID = 6

   return failureClassTimeCategory
  }

}

module.exports = MaintenanceFailureClassController
