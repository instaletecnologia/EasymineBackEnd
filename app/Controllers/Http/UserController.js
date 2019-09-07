'use strict'

const User = use("App/Models/User")

class UserController {
  async index (){
    return {
      id: 1,
      name: 'Usuário instale',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      email: 'desenvolvimento@instaletecnologia.com.br',
    }
  }
  async create ({ request }) {
    const data = request.only(["username", "email", "password"])

    const user = await User.create(data)

    return user
  }
}

module.exports = UserController