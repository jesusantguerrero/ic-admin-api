const Mail = use('Mail')
const Invoice = use('App/Models/Invoice')
const Database = use('Database')
class InvoiceAction {
  constructor(Invoice) {
    this.invoice = Invoice;
  }

  async sendEmail(data) {
    return await Mail.send('emails.invoice', {}, (message) => {
      let from = this.invoice ? this.invoice.user.email : process.env.EMAIL_ADMIN;
      message.replyTo(from)
      message.to(data.recipients[0])
      message.subject(data.subject)
      message.text(data.message)
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
