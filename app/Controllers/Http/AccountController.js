'use strict'

const BaseController = require('./BaseController');
const Account = use('App/Models/Account')

/**
 * Resourceful controller for interacting with accounts
 */
class AccountController extends BaseController {
  constructor() {
    super(Account)
  }
}

module.exports = AccountController
