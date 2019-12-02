'use strict'

class storeClient {
  get rules () {
    return {
      names: 'required',
      surename: 'required',
      phone: 'required',
      email: 'required|email',
      // validation rules
    }
  }
}

module.exports = storeClient
