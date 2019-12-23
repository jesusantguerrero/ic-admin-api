const Invoice = use('App/Models/Invoice');
const Database = use('Database');
const { addMonths, format } = require('date-fns');
const InvoiceAction = use('App/Domain/Invoice/Actions/InvoiceAction');

module.exports = {
    async createInvoices(contract = {}, initialDate = '', duration = 0, invoiceCount = 1) {

      const creationDate = format(new Date(), 'yyyy-MM-dd');
      let invoiceDate = initialDate || contract.date;

      return new Promise(async (resolve) => {
        let currentInvoice = invoiceCount;
        for (currentInvoice; currentInvoice <= duration; currentInvoice++) {
          const invoiceData = {
            company_id: contract.company_id,
            resource_id: contract.id,
            resource_type_id: "INVOICE",
            client_id: contract.client_id,
            user_id: contract.user_id,
            date: creationDate,
            due_date: invoiceDate,
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

          invoiceDate = this.findNextDate(invoiceDate);
          await invoiceAction.createInvoice(invoiceData)
        }
        resolve();
      })
    },
    async upgradeInvoices(contract, oldServiceId) {
        return new Promise(async (resolve) => {
            let invoices = await Invoice.query().where({resource_id: contract.id, status: 'unpaid'}).fetch();
            invoices = Array.from(invoices.rows)
            invoices.forEach(async invoice => {
              await invoice.updateService({
                oldServiceId: oldServiceId,
                serviceId: contract.service_id,
                amount: contract.amount
              });
            });
            resolve();
        })
    },

    async extendContract(contract, monthsToAdd) {
      return new Promise(async (resolve) => {
        let lastInvoiceDate = await contract.lastInvoiceDate();
        lastInvoiceDate = format(lastInvoiceDate, 'yyyy-MM-dd')
        const day = new Date(lastInvoiceDate).getDate();
        const nextPaymentDate = this.findNextDate(lastInvoiceDate, day);
        let len = Number(contract.duration);
        const duration = len + Number(monthsToAdd);
        len++;

        let updateContract = {
          duration: duration,
          status: 1
        }

        await this.createInvoices(contract, nextPaymentDate, duration, len)
        await Database.query().from('contracts').where({id: contract.id}).update(updateContract);
        resolve();
      })
    },
    findNextDate(date)
    {
      let localDate = date.split('-').map( digit => Number(digit.trim()));
      return format(addMonths(new Date(localDate), 1), 'yyyy-MM-dd');
    }

}
