'use strict'
const BaseController = require('./BaseController');
const Invoice = use('App/Models/Invoice')
const Database = use('Database')
/**
 * Resourceful controller for interacting with labels
 */
class InvoiceController extends BaseController{

  constructor() {
    super(Invoice)
  }

  async store ({ auth, request, response }) {
    const formData = request.all();
    let resource;
    
    if (this.model.customCreationHook && auth) {
      this.model.customCreationHook(formData, auth)
    }
    
    const transaction = await Database.beginTransaction()
    
    try {
        let items = formData.items.map(items => {return {...items}});
        delete formData.items;
        
        resource = await this.model.create(formData, transaction)
        items = await this.model.createLines(resource, items)
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

    try{
      const data = request.all();
      let items = data.items.map(items => {return {...items}});
      delete data.items;
      resource.merge(data);

      await resource.save();
      console.log(this.model.createLines)
      items = await this.model.createLines(resource, items).catch(e => console.log(e))

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
}

module.exports = InvoiceController
