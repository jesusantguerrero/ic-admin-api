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
    let responseData;
    switch (id) {
      case 'revenue':
        responseData = this.revenueReport(context);
        break
      case 'clients':
        responseData = this.clientsChange(context)
        break
      default:
        responseData = this.cashFlowReport(context);
        break
    }

    return responseData;
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

  async clientsChange({response}) {
    let dates = [];
    let interval = 'MONTH';
    for (let index = 0; index < 12; index++) {
      if (index == 0) {
        dates.push(`select DATE_FORMAT(SUBDATE(CURRENT_DATE(),INTERVAL ${index} ${interval}), '%Y%m') as dateUnit`);
      } else {
        dates.push(`union all select DATE_FORMAT(SUBDATE(CURRENT_DATE(),INTERVAL ${index} ${interval}), '%Y%m')`);
      }
    }

    const sql = `select 
    dates.dateUnit as unit, count(c.id) as total
    FROM (${dates.join(' ')}) as dates
    LEFT JOIN clients c ON DATE_FORMAT(c.created_at, '%Y%m') = dates.dateUnit
    GROUP BY dates.dateUnit
    `

    // return response.send(sql);
    const results = await Database.raw(sql);
    return response.json(results[0]);
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
