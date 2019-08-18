'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')

class Company extends Model {

    
  static createForUser(user) {
    const companyData = {
      user_id: user.id,
      RNC: '',
      nombre: `${user.username} Company`,
      logo: '',
      lema: '',
      direccion: '',
      telefono: '',
      telefonos: ''
    }
  
    if (!user.company_id) {
      return Company.create(companyData);
    } 

    return new Promise((resolve) => resolve())
  }
}

module.exports = Company
