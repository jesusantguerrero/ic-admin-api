'use strict'
const Company = use('App/Models/Company')

const UserHook = exports = module.exports = {}

UserHook.createCompany = async (user) => {
    if (!user.company_id) {
        const company = await Company.createForUser(user);
        if (company) {
            await company.reload();
            user.company_id = company.id;
        }
    }
}
