'use strict'
const BaseController = require('./BaseController');
const Invoice = use('App/Models/Invoice')
const Contract = use('App/Models/Contract')
const InvoiceAction = use('App/Domain/Invoice/Actions/InvoiceAction')
const ContractJobs = use('App/Domain/Contract/Jobs/Index');
const contractActions = use('App/Domain/Contract/Actions/ContractActions');
const Database = use('Database')
const Drive = use('Drive')
const Helpers = use('Helpers');
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


  //  custom calls
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
        return {resource: null, err: e};
    }

    await transaction.commit()
    return {resource, err: null}
  }

  // invoice-payments

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
      if (resource.resource_parent_type == 'CONTRACT') {
        const contract = await Contract.find(resource.resource_id);
        contractActions.checkInvoicesStatus(contract)
      }
    } catch(e) {
        return response.status(400).json({
          status: {
            message: e.toString()
          }
        });
    }

    return response.json(paymentDoc)
  }

  async sendEmail({response, request}) {
    const data = request.all();
    const invoiceAction = new InvoiceAction();

    try {
      await invoiceAction.sendEmail(data);

      return response.status(201).json({
        status: {
          message: 'Message sent'
        }
      })
    } catch (e) {
        return response.status(404).json({
          status: {
            message: e.toString()
          }
        })
    }
  }

  async upload({params, response, request}) {
    const resource = await this.model.find(params.id)
    let error;

    if (resource) {
      try {
        request.multipart.file('logo', {}, async (file) => {
          console.log(file)
          const filename = `${params.id}.${file.extname}`;
          
          await Drive.put(filename,  file.stream)
          resource.logo = `/uploads/${filename}`
          await resource.save();
  
          return response.json({
            filename: `/uploads/${filename}`
          });
        })

        await request.multipart.process()
        // await profilePic.move(Helpers.tmpPath('uploads'), {
        //   name: filename,
        //   overwrite: true
        // })

        // if (!profilePic.moved()) {
        //   console.log(profilePic.error())
        //   throw profilePic.error()
        // }

      } catch (e) {
        return response.status(401).json({
          status: {
            message: e.toString()
          }
        })
      }
    } else {
      return response.status(401).json({
        status: {
          message: 'resource not found'
        }
      })
    }
  }
}

module.exports = InvoiceController
