'use strict'

const BaseController = use('./BaseController');
const LineItem = use('App/Models/LineItem')

/**
 * Resourceful controller for interacting with lineitems
 */
class LineItemController  extends BaseController {
  constructor() {
    super(LineItem)
  }
}

module.exports = LineItemController
