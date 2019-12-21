'use strict'
const Event = use('Event');
const Contract = use('App/Models/Contract')
const BaseController = require('./BaseController')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tickets
 */
class ContractController extends BaseController {
    constructor() {
        super(Contract, 'contract')
    }

    /**
   * Update ticket details.
   * PUT or PATCH tickets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const resource = await this.model.find(params.id)
    if (!resource) {
      return response.status(400).json({
        status: {
          message: "resource not found"
        }
      });
    }

    const updateData = request.all();
    
    if (updateData.ip_id != resource.ip_id) {
       resource.releaseIp();
    }

    resource.merge(updateData);

    try{
     await resource.save();
      if (this.modelName) {
        Event.fire(`updated::${this.modelName}`, resource)
      }
    } catch(e) {
      return response.status(400).json({
        status: {
          message: e.toString()
        }
      });
    }

    return response.json(resource)
  }
}

module.exports = ContractController
