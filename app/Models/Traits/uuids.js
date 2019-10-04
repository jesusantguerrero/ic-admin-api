'use strict'
const uuid = require('uuid/v4');

class Uuids {
  register (Model) {
    Model.addHook('beforeCreate', function (modelInstance) {
        modelInstance.id = uuid()
    })
  }
}

module.exports = Uuids