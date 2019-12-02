const Mail = use('Mail')


class InvoiceAction {
  constructor(Invoice) {
    this.invoice = Invoice;
  }

  sendEmail() {
    await Mail.send('emails.welcome', {}, (message) => {
      let from = this.invoice ? this.invoice.user.email : 'jesusant@mctekk.com';
      let to = this.invoice ? this.invoice.client.email : 'jesusant.guerrero@gmail.com';
      message.from(from)
      message.to(to)
    })
  }
}
