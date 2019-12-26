'use strict'

const BaseController = require('./BaseController');
const Database = use('Database');
const lodash = require('lodash');

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {

  async index(context) {
    const id = context.params.id
    switch (id) {
      case 'revenue':
        return this.revenueReport(context);
      default:
        return this.cashFlowReport(context);
    }
  }

  async revenueReport({response}) {
    const year = new Date().getFullYear();
    const previousYear = new Date().getFullYear() - 1;
    const sql = `SELECT
    sum(COALESCE(amount,0)) as total, months.number month
    FROM months
    LEFT JOIN payment_docs ON months.number = MONTH(payment_date) AND YEAR(payment_date) = '?'
    GROUP BY months.number, YEAR(payment_docs.payment_date);`
  
    const results = await Database.raw(sql, year);
    const previousYearResult = await Database.raw(sql, previousYear);
    return response.json({
      currentYear: {
        year: year,
        values: results[0],
        total: lodash.sumBy(results[0], 'total')
      }, 
      previousYear: {
        year: previousYear,
        values: previousYearResult[0],
        total: lodash.sumBy(previousYearResult[0], 'total')
      }
    });
  }
  
  async cashFlowReport({response}) {
    const sql = `
    SELECT 
      SUM(payment_docs.amount) AS total, 
      monthname(MAX(payment_date)) AS month, 
      DATE_FORMAT(payment_docs.payment_date, "%Y%m") AS yearmonth
    FROM 
      payment_docs
    GROUP BY 
      DATE_FORMAT(payment_docs.payment_date, "%Y%m") 
    order by 
      DATE_FORMAT(payment_docs.payment_date, "%Y%m") DESC
    LIMIT 
      12`;

    const results = await Database.raw(sql);
    return response.json(results[0]);
  }
}

module.exports = CategoryController
