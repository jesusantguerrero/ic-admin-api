'use strict'
let SetupAction = use('App/Actions/SetupAction')
const UserHook = exports = module.exports = {}

UserHook.createCompany = async (user) => {
    if (!user.company_id) {
      SetupAction = new SetupAction(user);

        const company = await SetupAction.createUserCompany();
        if (company) {
            await company.reload();
            user.company_id = company.id;
        }
    }
}
