'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with transactions
 * 
 */

const BaseController = require('./BaseController');
const Transaction = use('App/Models/Transaction')
const Database = use('Database')

class TransactionController extends BaseController {
  constructor() {
    super(Transaction)
  }

  async store ({ auth, request, response }) {
    const formData = request.all();
    
    if (this.model.customCreationHook && auth) {
      this.model.customCreationHook(formData, auth)
    }
        
    const {resource, err} = await this.createTransaction(formData)

    if (err) {
        return response.status(400).json({
            status: {
                message: err.toString()
            }
        });
    }

    if (this.modelName) {
      Event.fire(`new::${this.modelName}`, resource)
    }

    return response.json(resource);
  }

  /**
   * Update transaction details.
   * PUT or PATCH transaction/:id
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

    try{
      const data = request.all();
      if (this.model.customCreationHook && auth) {
        this.model.customCreationHook(data, auth)
      }
      
      let items = data.items.map(items => {return {...items}});
      delete data.items;
      resource.merge(data);

      await resource.save();
      items = await this.model.createLines(resource, items).catch(e => console.log(e))

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
  
  //  custom calls
  /**
   * Clone the transaction.
   * POST tickets/:id/clone
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async clone ({ params, auth, response }) {
    let formData = await this.model.find(params.id)
    
    if (!formData) {
      return response.status(400).json({
        status: {
          message: "resource not found"
        }
      });
    }

    if (this.model.customCreationHook && auth) {
      this.model.customCreationHook(formData, auth)
    }

    let items = await formData.lineItems().fetch()
    items = items.toJSON().map(item => {
      return {...item}
    });

    formData = {...formData.toJSON()};
    formData.status = 0;
    formData.items = items;

    const {resource, err} = await this.createInvoice(formData)

    if (err) {
        return response.status(400).json({
            status: {
                message: err.toString()
            }
        });
    }

    return response.json(resource)
  }

  //  utils
  async createTransaction(formData) {
    const transaction = await Database.beginTransaction()
    let resource;
    
    try {
        let items = formData.items.map(items => {return {...items}});
        delete formData.items;

        resource = await this.model.create(formData, transaction)
        await this.model.createLines(resource, items)
    } catch (e) {
        await transaction.rollback()
        return {resource: null, err: e};
    }

    await transaction.commit()
    return { resource, err: null}
  }
}

module.exports = TransactionController
