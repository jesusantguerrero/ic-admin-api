'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    this.socket.on('message', (message) => {
      this.emitMessage(message);
    })

    this.socket.on('typing', (data) => {
      this.emitTyping(data);
    })
    
    // emit events
  }
  
  
  emitMessage(message) {
    this.socket.broadcast('message', message)
  }
  
  emitTyping(data) {
    this.socket.broadcast('typing', data)
  }
}

module.exports = ChatController
