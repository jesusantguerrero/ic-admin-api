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
    let oldServiceId;
    if (!resource) {
      return response.status(400).json({
        status: {
          message: "resource not found"
        }
      });
    }

    const updateData = request.all();

    //  handle ip change
    if (updateData.ip_id != resource.ip_id) {
       resource.releaseIp();
    }

    // handle service upgrade
    if (updateData.service_id != resource.service_id) {
      oldServiceId = resource.service_id;
    }

    resource.merge(updateData);

    try{
      await resource.save();
      if (this.modelName) {
        Event.fire(`updated::${this.modelName}`, resource)
      }

      if (oldServiceId) {
        resource.upgrade(oldServiceId);
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
  
  /**
   * Extend contract
   * POST contracts/:id/extend
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async extend ({ params, request, response }) {
    const resource = await this.model.find(params.id)

    if (!resource) {
      return response.status(400).json({
        status: {
          message: "resource not found"
        }
      });
    }

    const extendData = request.all();

    try{
      await resource.addMonths(extendData.duration);
    } catch(e) {
      return response.status(400).json({
        status: {
          message: e.toString()
        }
      });
    }

    return response.json(resource)
  }
    /**
   * cancel contract
   * POST contracts/:id/cancel
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async cancel ({ params, request, response }) {
    const resource = await this.model.find(params.id)

    if (!resource) {
      return response.status(400).json({
        status: {
          message: "resource not found"
        }
      });
    }

    const cancelationData = request.all();

    try{
      await resource.cancel(cancelationData);
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
