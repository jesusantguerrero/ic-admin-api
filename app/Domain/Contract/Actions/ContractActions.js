const Invoice = use('App/Models/Invoice');
const Cancelation = use('App/Models/Cancelation');
const Contract = use('App/Models/Contract');
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
            resource_parent_type: 'CONTRACT',
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

    async extendContract(contract, monthsToAdd, date) {
      return new Promise(async (resolve) => {
        let lastInvoiceDate = date || await contract.lastInvoiceDate();
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

        contract.merge(updateContract);

        await this.createInvoices(contract, nextPaymentDate, duration, len)
        await Database.query().from('contracts').where({id: contract.id}).update(updateContract);
        await this.checkInvoicesStatus(contract);
        resolve();
      })
    },

    cancelContract(contract, cancelationData) {
      return new Promise(async resolve => {
        const settings = {
          cancelationPenalty: 50
        }
        const creationDate = format(new Date(), 'yyyy-MM-dd')
        let penalty = 0;
  
        if (cancelationData.penalty == 1) {
            penalty = settings.cancelationPenalty / 100 * contract.amount * 12;
        }
  
        let invoiceData = null;
        const cancelationEntry = {
          contract_id: contract.id,
          company_id: contract.company_id,
          reason:  cancelationData.reason
        };

        if (cancelationData.includePayment) {
          invoiceData = {
            company_id: contract.company_id,
            resource_id: contract.id,
            resource_type_id: "INVOICE",
            client_id: contract.client_id,
            user_id: contract.user_id,
            date: creationDate,
            due_date: creationDate,
            concept: `Invoice Contract`,
            description: `Cancelation for Contract ${contract.serie || ''}-${contract.number || ''}`,
            logo: "",
            notes: "",
            footer: "",
            subtotal: penalty,
            penalty: 0.00,
            extra_amount: 0.00,
            discount: 0.00,
            total: penalty,
            resource_parent_type: 'CONTRACT',
            debt: 0,
            items: [{
              concept: `Cancelation for Contract ${contract.serie || ''}-${contract.number || ''}`,
              price: penalty,
              quantity: 1,
              index: 0
            }]
          }
        }
          if (await this.cancelationJob(contract)) {
            if (invoiceData) {
              invoiceAction =  new InvoiceAction()
              await invoiceAction.createInvoice(invoiceData)
            }
            await Database.query().from('contracts').where({id: contract.id}).update({ status: 'canceled'})
            await Cancelation.create(cancelationEntry)
            await this.checkInvoicesStatus(contract);
          }
          resolve(true)
      })
    },

    async cancelationJob(contract) {
      return new Promise(async resolve => {
        if (!['active','suspended'].includes(contract.status)) {
          resolve(false);
        } else {
          const invoices = await Invoice.query().where({resource_id: contract.id, status: 'unpaid'}).fetch();
          invoices.rows.forEach(async invoice => {
            await invoice.removeLines()
            await invoice.delete();
          });

          this.releaseIp(contract.id, contract.ip_id)
          resolve(true);
        }
      })
    },

    reconnectContract(contract, reconnectionData) {
      this.extendContract(contract, reconnectionData['duration'], reconnectionData['date'])
    },

    async releaseIp(contractId, ipId) {
      if (ipId && contractId) {
          await Database.query().from('contracts').where({id: contractId }).update({ last_ip: ipId})
          await Database.query().from('ips').where({id: ipId}).update({ status: 0})
      }
    },

    async checkInvoicesStatus(contract) {
      if (contract) {
          const updateData = {
            duration: contract.duration,
            status: contract.status
          }
          const totalPaid = await Database.query().from('invoices').where({resource_id: contract.id, status: 'paid'}).count('id as paidTotal')
          const totalLate = await Database.query().from('invoices').where({resource_id: contract.id, status: 'late'}).count('id as lateTotal')
          const duration = await Database.query().from('invoices').where({resource_id: contract.id}).count('id as duration')
          updateData.paid = parseFloat(totalPaid[0]['paidTotal'] || 0);
          updateData.late = parseFloat(totalLate[0]['lateTotal'] || 0);
          updateData.duration =  parseFloat(duration[0]['duration'] || 0)
          updateData.status = this.checkStatus(updateData);
          await Database.query().from('contracts').where({id: contract.id}).update(updateData);
        }
    },

    checkStatus(contract) {
      let status = contract.status;
      if ( contract.late > 0) {
        status = 'late';
      } else if (contract.paid >= 0 && contract.paid < contract.duration) {
        status = 'active';
      } else if (contract.paid == contract.duration) {
        status = 'paid';
      } else {
        status = 'unpaid';
      }
      return status;
    },

    findNextDate(date) {
      let localDate = date.split('-').map( digit => Number(digit.trim()));
      return format(addMonths(new Date(localDate), 1), 'yyyy-MM-dd');
    }

}
