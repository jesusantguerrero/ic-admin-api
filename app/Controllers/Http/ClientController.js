'use strict'
const BaseController = use('Freesgen/BaseController');
const Client = use('App/Models/Client')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clients
 */
class ClientController extends BaseController {
    constructor() {
        super(Client, 'client')
    }
}

module.exports = ClientController
