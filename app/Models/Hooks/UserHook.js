'use strict'
let SetupAction = use('App/Domain/Application/Actions/SetupAction')
const UserHook = exports = module.exports = {}

UserHook.createCompany = async (user) => {
    if (!user.company_id) {
      SetupAction(user);
    }
}
