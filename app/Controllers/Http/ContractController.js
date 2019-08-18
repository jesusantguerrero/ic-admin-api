'use strict'
const BaseController = require('./BaseController');;
const Contract = use('App/Models/Contract')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tickets
 */
class ContractController extends BaseController {
    constructor() {
        super(Contract, 'contract')
    }
}

module.exports = ContractController
