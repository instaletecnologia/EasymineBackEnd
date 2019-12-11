'use strict'

class SessionController {

  async currentUser ({ auth }) {
   return auth.user
  }

  async revokeToken ({ auth }) {
    const apiToken = auth.getAuthHeader()
    auth.revokeTokens([apiToken], true)

    return true
  }

  async store ({ request, response, auth }) {
    const { Login, password } = request.all()

    const token = await auth.attempt(Login, password)

    return token
  }

}

module.exports = SessionController
