'use strict'

const { Command } = require('@adonisjs/ace')
const got = require('got');

class Invoice extends Command {
  static get signature () {
    return 'invoice'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {
    try {
      const response = await got("https://wisdomapi.herokuapp.com/v1/author/paulg/random").json()
      const quote = JSON.parse(response.body)
      console.log(`${this.chalk.gray(quote.author.name)} - ${this.chalk.cyan(quote.author.company)}`)
      console.log(`${quote.content}`)
    } catch (err) {
      console.log(err)
      console.log(error.response.body);
    }
  }
}

module.exports = Invoice
