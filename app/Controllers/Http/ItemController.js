'use strict'
// const User = use('User');
const Database = use('Database')

class ItemController {
    async index({ response}) {
        //  response.send("hello itemss");
        const users = await Database.table('items').select('*');
         response.send(users);
    }
}

module.exports = ItemController
