'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const TransactionLine = use('App/Models/TransactionLine')
const Database = use('Database')
const uuid = require('uuid/v4')

class Transaction extends Model {
    static boot() {
        super.boot()
        
        this.addHook('beforeCreate', async (transaction) => {
            await Transaction.setNumber(transaction)
        })
        
        this.addHook('beforeSave', async (transaction) => {
            await Transaction.setNumber(transaction);
        })

        this.addHook('beforeDelete', async (transaction) => {
            await TransactionLine.query()
                  .where('transaction_id', transaction.id)
                  .delete()
        })
    }

    transactionLines() {
        return this.hasMany('App/Models/TransactionLine', 'id', 'transaction_id' )
    }


    //  Utils
    static async setNumber(transaction) {
        let isInvalidNumber = true;

        if (transaction.number) {
            isInvalidNumber = await Database.table('transactions').where({
                company_id: transaction.company_id, 
                number: transaction.number, 
            }).whereNot({
                id: transaction.id
            });

            isInvalidNumber = isInvalidNumber.length
        }

        if (isInvalidNumber) {
            const result = await Database.table('transactions').where({
                company_id: transaction.company_id, 
            }).max('number as number');
            transaction.number = Number(result[0].number) + 1;
        }
    }

    static async createLines(transaction, items) {
        return new Promise(async (resolve) => {
            try {
                await TransactionLine.query().where('transaction_id', transaction.id).delete();
                if (!items || !items.length) {
                    return
                }
                
                items.forEach(async (item) => {
                    await transaction.transactionLines().create({
                        amount: item.amount,
                        concept: item.concept,
                        index: item.index,
                        type: item.type,
                        account_id: item.account_id,
                        category_id: item.category_id,
                        company_id: transaction.company_id,
                        id: uuid()
                    })
                })
            } catch(e) {
                console.log(e)
            }    
            resolve()
        })
    }

    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
        formData.user_id = auth.user.user_id;
    }
}

module.exports = Transaction
