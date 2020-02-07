'use strict'
const socket = use('socket.io-client')

class SocketIOClient {
  constructor (url) {
    return socket(url, {
      autoConnect: true,
    })
  }
}

module.exports = SocketIOClient
