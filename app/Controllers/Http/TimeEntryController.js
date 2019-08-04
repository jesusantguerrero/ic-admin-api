'use strict'
const BaseController = use('Freesgen/BaseController');
const TimeEntry = use('App/Models/TimeEntry')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with labels
 */
class TimeEntryController extends BaseController{

  constructor() {
    super(TimeEntry)
  }

}

module.exports = TimeEntryController
