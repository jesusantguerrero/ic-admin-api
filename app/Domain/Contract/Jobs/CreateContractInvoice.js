const InvoiceAction = use('App/Domain/Invoice/Actions/InvoiceAction');

module.exports = async (job, done) => {
  // job.data contains the custom data passed when the job was created
  // job.id contains id of this job.
  const contract = job.data.contract;

  for (let currentInvoice = 1; currentInvoice <= contract.duration; currentInvoice++) {
    const invoiceData = {
      company_id: contract.company_id,
      resource_id: contract.id,
      resource_type_id: "INVOICE",
      client_id: contract.client_id,
      user_id: contract.user_id,
      date: contract.date,
      due_date: contract.due_date,
      concept: `Invoice Contract`,
      description: `Invoice Contract ${currentInvoice}`,
      logo: "",
      notes: "",
      footer: "",
      subtotal: contract.amount,
      penalty: 0.00,
      extra_amount: 0.00,
      discount: 0.00,
      total: contract.amount,
      debt: 0,
      items: [{
         service_id: contract.service_id,
         concept: contract.service_name,
         price: contract.amount,
         quantity: 1,
         index: 0
      }]
    }

    invoiceAction =  new InvoiceAction()

    await invoiceAction.createInvoice(invoiceData)
     // transcode video asynchronously and report progress
     job.progress(currentInvoice / contract.duration * 100);
  }

  // call done when finished
  done();
};
