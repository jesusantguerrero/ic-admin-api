'use strict'
const BaseController = require('./BaseController');;
const Router = use('App/Models/Router')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tickets
 */
class RouterController extends BaseController {
    constructor() {
        super(Router, 'router')
    }
}

module.exports = RouterController
