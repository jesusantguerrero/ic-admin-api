const Mail = use('Mail')
const Invoice = use('App/Models/Invoice')
const Database = use('Database')
class InvoiceAction {
  constructor(Invoice) {
    this.invoice = Invoice;
  }

  async sendEmail() {
    return await Mail.connection('sparkpost').send('emails.invoice', {}, (message) => {
      let from = this.invoice ? this.invoice.user.email : 'jesusant@mctekk.com';
      let to = this.invoice ? this.invoice.client.email : 'jesusant.guerrero@gmail.com';
      message.from(from)
      message.to(to)
      message.subject('Hello world')
    })
  }

  async createInvoice(formData) {
    const transaction = await Database.beginTransaction()
    let resource;

    try {
        let items = formData.items.map(items => {return {...items}});
        delete formData.items;

        resource = await Invoice.create(formData, transaction)
        await Invoice.createLines(resource, items)
    } catch (e) {
        await transaction.rollback()
        console.log(e.toString())
        return {resource: null, err: e};
    }

    await transaction.commit()
    return {resource, err: null}
  }
}

module.exports = InvoiceAction;
