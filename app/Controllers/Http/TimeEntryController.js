'use strict'
const BaseController = require('./BaseController');
const TimeEntry = use('App/Models/TimeEntry')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with labels
 */
class TimeEntryController extends BaseController{

  constructor() {
    super(TimeEntry)
  }

}

module.exports = TimeEntryController
