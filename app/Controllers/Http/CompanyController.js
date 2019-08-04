'use strict'
const BaseController = use('Freesgen/BaseController');
const Company = use('App/Models/Company')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tickets
 */
class CompanyController extends BaseController {
    constructor() {
        super(Company)
    }
}

module.exports = CompanyController
