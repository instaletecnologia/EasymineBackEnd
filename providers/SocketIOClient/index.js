'use strict'
const socket = use('socket.io-client')

class SocketIOClient {
  constructor (url) {
    return socket(url, {
      autoConnect: true,
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      query: {
        isServer: true,
      }
    })
  }
}

module.exports = SocketIOClient
