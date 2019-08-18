'use strict'
const uuid = require('uuid/v4');

class NoTimestamp {
  register (Model) {
    Model.addHook('beforeCreate', function (modelInstance) {
        modelInstance.id = uuid()
    })
  }
}

module.exports = NoTimestamp
