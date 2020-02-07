'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersAddfieldsSchema extends Schema {
  up () {
    this.table('Usuarios', (table) => {
      table.string('password', 60).notNullable()
      table.string('token').nullable()
      table.datetime('token_created_at').nullable()
    })
  }

  down () {
    this.table('Usuarios', (table) => {
      table.dropColumn('password')
      table.dropColumn('token')
      table.dropColumn('token_created_at')
    })
  }
}

module.exports = UsersAddfieldsSchema
