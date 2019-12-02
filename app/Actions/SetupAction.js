const Company = use('App/Models/Company');

class SetupAction {
  constructor(user) {
    this.user = user;
  }

  async createUserCompany() {
    this.company = Company.createForUser(this.user);
    return this.company;
  }
}

module.exports = SetupAction;
