'use strict'
const BaseController = require('./BaseController');;
const Ticket = use('App/Models/Ticket')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tickets
 */
class TicketController extends BaseController{

  constructor() {
    super(Ticket)
  }

}

module.exports = TicketController
