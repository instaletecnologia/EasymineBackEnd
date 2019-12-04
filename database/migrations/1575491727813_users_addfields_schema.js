'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersAddfieldsSchema extends Schema {
  up () {
    this.table('users_addfields', (table) => {
      table.string('password', 60).notNullable()
      table.string('token').nullable()
      table.datetime('token_created_at').nullable()
    })
  }

  down () {
    this.table('users_addfields', (table) => {
      table.string('password', 50).notNullable()
      table.string('token').nullable()
      table.datetime('token_created_at').nullable()
    })
  }
}

module.exports = UsersAddfieldsSchema
