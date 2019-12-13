'use strict'

const { test, trait } = use('Test/Suite')('User')

trait('Test/ApiClient')

test('Criar um novo usuario.', async ({ client }) => {

  const response = await client.post('/users').send({
    name: "NomeTest",
    plate: 101013,
    email: "NomeTest@gmail.com",
    password: "1234456",
    userSectorID: -10,
    userCreationID: 2115,
    userPermissionID: 1,
    login: "NomeTest",
    loginType: "AD",
    input: "M",
    active: true
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    Nome: "NomeTest",
    Chapa: 101013
  })


})
