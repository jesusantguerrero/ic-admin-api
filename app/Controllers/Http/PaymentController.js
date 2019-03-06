'use strict'
const BaseController = require('./BaseController');
const Payment = use('App/Models/Payment')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tickets
 */
class PaymentController extends BaseController {
    constructor() {
        super(Payment, 'payment')
    }
}

module.exports = PaymentController
