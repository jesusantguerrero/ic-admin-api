'use strict'
const BaseController = use('Freesgen/BaseController');
const Label = use('App/Models/Label')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with labels
 */
class LabelController extends BaseController{

  constructor() {
    super(Label)
  }

}

module.exports = LabelController
