'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClassesFalhasCategoriasTempo extends Model {

  static get table () {
    return 'man.ClassesFalhasCategoriasTempos'
  }

  static get primaryKey () {
    return 'ClasseFalhaCategoriaTempoID'
  }

  static get incrementing () {
    return true
  }

  static get visible(){
    return [
      'CategoriaTempoID',
      'ClasseFalhaID',
      'UsuarioRegistroID',
      'UsuarioAlteracaoID',
      'DataRegistro',
      'DataAlteracao',
    ]
  }

  ClassesFalha(){
    return this.belongsTo('App/Models/ClassesFalha', 'ClasseFalhaID', 'ClasseFalhaID')
  }

}

module.exports = ClassesFalhasCategoriasTempo
