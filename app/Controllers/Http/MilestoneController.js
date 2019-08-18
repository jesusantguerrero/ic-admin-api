'use strict'
const BaseController = require('./BaseController');;
const Milestone = use('App/Models/Milestone')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with milestones
 */
class MilestoneController extends BaseController{

  constructor() {
    super(Milestone)
  }

}

module.exports = MilestoneController
