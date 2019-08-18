'use strict'
const BaseController = require('./BaseController');;
const Price = use('App/Models/Price')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with prices
 */
class PriceController extends BaseController {
    constructor() {
        super(Price, 'price')
    }
}

module.exports = PriceController
