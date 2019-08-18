'use strict'
const BaseController = require('./BaseController');;
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tickets
 */
class UserController extends BaseController {
    constructor() {
        super(User)
    }
}

module.exports = UserController
