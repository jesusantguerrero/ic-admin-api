const Invoice = use('App/Models/Invoice');

module.exports = {
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
    }
}