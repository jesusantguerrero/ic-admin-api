'use strict'

const CrudController = require('./CrudController');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tickets
 */
class BaseController extends CrudController {
  constructor(model) {
    super(model);
    this.model = model;
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
  async index ({ request, response, view }) {
    const query = request.get();
    
    if (Object.keys(query).length) {
      let modelQuery = this.getModelQuery(query);
      return response.json(await modelQuery.fetch());
    }
    response.json(await this.model.all());
  }

  /**
   * Render a form to be used for creating a new ticket.
   * GET tickets/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new ticket.
   * POST tickets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const formData = request.all();
    let resource;
    try {
        resource = await this.model.create(formData) 

    } catch (e) {
        return response.status(400).json({
            status: {
                message: e.sqlMessage
            }
        });
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
  async show ({ params, request, response, view }) {
    response.json(await this.model.find(params.id))
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
     await resource.save()
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
      response.status(400).json({
        status: {
          message: e
        }
      });
    }

    response.json(resource)
  }
}

module.exports = BaseController
