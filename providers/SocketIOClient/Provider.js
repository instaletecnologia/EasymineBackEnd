const { ServiceProvider } = require('@adonisjs/fold')

class SocketIOClientProvider extends ServiceProvider {
  register () {
    this.app.singleton('SocketIOClient', () => {
      const Env = this.app.use('Env')
      const socketInstance = new (require('.'))(Env.get('MICROSERVICE_REALTIME'))

      let timer = this.startInterval(socketInstance)

      socketInstance.on('connect', () => {
        clearInterval(timer)
        console.log('connectado')
      })

      socketInstance.on('disconnect', () => {
        timer = this.startInterval(socketInstance)
        console.log('desconectado!')
      })

      return socketInstance
    })
  }
  startInterval(instance){
    return setInterval(() => {
      if (!instance.connected) instance.connect()
    }, 2000)
  }
}

module.exports = SocketIOClientProvider