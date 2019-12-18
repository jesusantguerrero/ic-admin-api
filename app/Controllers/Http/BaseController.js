'use strict'

const Event = use('Event');
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tickets
 */
class BaseController  {
  constructor(model, modelName = '') {
    this.model = model;
    this.modelName = modelName;
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
    console.log(query);
    return response.json(await this.model.getFromQuery(query, true));
  }


  /**
   * Create/save a new ticket.
   * POST tickets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async store ({ auth, request, response }) {
    const formData = request.all();
    let resource;

    if (this.model.customCreationHook && auth) {
      this.model.customCreationHook(formData, auth)
    }

    const transaction = await Database.beginTransaction()

    try {
        resource = await this.model.create(formData, transaction)
    } catch (e) {
        await transaction.rollback()
        return response.status(400).json({
            status: {
                message: e
            }
        });
    }

    await transaction.commit()

    if (this.modelName) {
      Event.fire(`new::${this.modelName}`, resource)
    }


    return response.json(resource);
  }

  /**
   * Display a single ticket.
   * GET tickets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response}) {
    const query = request.get();
    return response.json(await this.model.getFromQuery(query, params.id));
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

    resource.merge(request.all());

    try{
     await resource.save();
      if (this.modelName) {
        Event.fire(`updated::${this.modelName}`, resource)
      }
    } catch(e) {
      return response.status(400).json({
        status: {
          message: e
        }
      });
    }

    return response.json(resource)
  }

  /**
   * Delete a ticket with id.
   * DELETE tickets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const resource = await this.model.find(params.id)
    if (!resource) {
      response.status(400).json({
        status: {
          message: "User nor found"
        }
      });

    }

    try{
     await resource.delete()
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

module.exports = BaseController
