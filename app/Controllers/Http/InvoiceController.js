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
    
    if (this.model.customCreationHook && auth) {
      this.model.customCreationHook(formData, auth)
    }
        
    const {resource, err} = await this.createInvoice(formData)

    if (err) {
        return response.status(400).json({
            status: {
                message: err
            }
        });
    }

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

  /**
   * Update ticket details.
   * PUT or PATCH tickets/:id
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
    formData.status = 1;
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

  /**
   * add payment to invoice.
   * POST invoices/:id/add-payment
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async deletePayment ({ params, request, response }) {
    const resource = await this.model.find(params.id)
    let error;

    if (!resource) {
      error ="resource not found"
    }

    if (error) {
      return response.status(400).json({
        status: {
          message: error
        }
      });
    }

    try{
      await resource.deletePaymentDoc(params.paymentId).catch(e => console.log(e))
      await resource.save();

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
   * add payment to invoice.
   * POST invoices/:id/add-payment
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async addPayment ({ params, request, response }) {
    const resource = await this.model.find(params.id)
    const data = request.all();
    let paymentDoc, error;

    if (!resource) {
      error ="resource not found"
    }

    if (resource && Number(resource.debt) <= 0) {
      error = "This invoice is already paid";
    }

    if (error) {
      return response.status(400).json({
        status: {
          message: error
        }
      });
    }

    try{
      paymentDoc = await resource.createPaymentDoc(data).catch(e => console.log(e))
      await resource.save();

    } catch(e) {
        return response.status(400).json({
          status: {
            message: e.toString()
          }
        });
    }

    return response.json(paymentDoc)
  }
  
  async createInvoice(formData) {
    const transaction = await Database.beginTransaction()
    let resource;
    
    try {
        let items = formData.items.map(items => {return {...items}});
        delete formData.items;

        resource = await this.model.create(formData, transaction)
        await this.model.createLines(resource, items)
    } catch (e) {
        await transaction.rollback()
        console.log("here is the error", e)
        return {resource: null, err: e};
    }

    await transaction.commit()
    return {resource, err: null}
  }
}

module.exports = InvoiceController
