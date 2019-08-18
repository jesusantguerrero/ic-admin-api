'use strict'
const BaseController = require('./BaseController');;
const Service = use('App/Models/Service')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tickets
 */
class ServiceController extends BaseController {
    constructor() {
        super(Service, 'service')
    }
}

module.exports = ServiceController
