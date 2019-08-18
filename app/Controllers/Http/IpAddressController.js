'use strict'
const BaseController = require('./BaseController');;
const IpAddress = use('App/Models/Ip')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with prices
 */
class IpAddressController extends BaseController {
    constructor() {
        super(IpAddress, 'ipAddress')
    }
}

module.exports = IpAddressController
