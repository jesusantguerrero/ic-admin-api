'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Freesgen/Adonis/BaseModel')

class Timer extends Model {
    static get start () {
        return super.start.format("YYYY-MM-DD")
      }
}

module.exports = Timer
