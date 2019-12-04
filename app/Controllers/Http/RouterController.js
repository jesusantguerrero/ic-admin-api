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

      /**
   * Show a list of all tickets.
   * GET tickets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({auth, request, response}) {
    let query = request.get();

    if (auth && (!query.filter || !query.filter.company_id || query.filter.company_id != auth.user.company_id ) ) {
      const filters  =  Object.assign(query.filter || {} , { company_id: auth.user.company_id})
      query.filter = filters;
    }

    return response.json(await this.model.getFromQuery(query, null, this.countUsedIps));
  }

  countUsedIps(builderChain) {
      return builderChain.withCount('ips as used_ips', (builder) => {
        builder.where('status', 1)
      }).withCount('ips as total_ips')
  }
}

module.exports = RouterController
