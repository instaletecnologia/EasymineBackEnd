'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClassesFalha extends Model {

  static get table () {
    return 'man.ClassesFalhas'
  }

  static get primaryKey () {
    return 'ClasseFalhaID'
  }

  static get incrementing () {
    return true
  }

  static get visible(){
    return [
  'ClasseFalhaID',
	'Descricao',
	'Ativo',
	'CodigoIntegracao',
	'TipoInputID',
	'UsuarioRegistroID',
	'UsuarioAlteracaoID',
	'DataRegistro',
	'DataAlteracao',
    ]
  }
}

module.exports = ClassesFalha
