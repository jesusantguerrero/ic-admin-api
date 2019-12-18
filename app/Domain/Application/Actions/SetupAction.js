const Company = use('App/Models/Company');
const Database = use('Database');

module.exports = async function (user) {
    const company = await Company.createForUser(user);
    const query = Database.table('users')

    if (company) {
        await company.reload();
        user.company_id = company.id;
        await query.where('id', user.id).update('company_id', company.id)
    }
}

