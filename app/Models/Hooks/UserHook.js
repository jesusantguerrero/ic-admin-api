'use strict'
const Company = use('App/Models/Company')

const UserHook = exports = module.exports = {}

UserHook.createCompany = async (user) => {
    const companyData = {
        RNC: '',
        nombre: `${user.username} Company`,
        logo: '',
        lema: '',
        direccion: '',
        telefono: '',
        telefonos: ''
    }
    if (!user.id_company) {
        const company = await Company.create(companyData);
        user.id_company = company.id;
    }
}
