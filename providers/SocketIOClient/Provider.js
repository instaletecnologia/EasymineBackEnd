const { ServiceProvider } = require('@adonisjs/fold')

class SocketIOClientProvider extends ServiceProvider {
  register () {
    this.app.singleton('SocketIOClient', () => {
      const Env = this.app.use('Env')
      return new (require('.'))(Env.get('MICROSERVICE_REALTIME'))
    })
  }
}

module.exports = SocketIOClientProvider