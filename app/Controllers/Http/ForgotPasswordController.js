'use strict'

const moment = require('moment')
const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate()

const crypto = require('crypto')

const User = use('App/Models/Usuarios')
const Mail = use('Mail')


class ForgotPasswordController {

  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = NewcurrentDate

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
          .to(email)
          .from('Easymine@mail.com', 'Easymine')
          .subject('Password recovery')
        }
      )

    } catch (err) {
      return response
      .status(err.status)
      .send({ error: { message: 'Email not found, does this email exist?'}})
    }

  }

  async update ({ request, response }) {
    try {
      const {token, password } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
      .subtract('1', 'days')
      .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
        .status(401)
        .send({ error: { message: 'The recovery token is expired.'}})
      }

      user.token = null
      user.token_created_at = null
      user.Senha = password

      await user.save()
      return user

    } catch (err) {
      return response
      .status(err.status)
      .send({ error: { message: 'Unable to reset your password, please try again.'}})
    }
  }
}

module.exports = ForgotPasswordController
