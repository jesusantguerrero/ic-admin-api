'use strict'

const BaseController = require('./BaseController');
const Timer = use('App/Models/Timer')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with timers
 */
class TimerController extends BaseController{
  constructor() {
    super(Timer)
  }
}

module.exports = TimerController
