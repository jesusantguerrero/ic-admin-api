const Database = use('Database');

class SearchAction {
    constructor(model) {
        this.model = model;
    }

    static async create(model, data) {
      const userId = await Database.table(model.table).insert(data)
    }

    delete(model) {

    }

    search(model) {
      Database.connection('mysql_read').table('test1').select('*');
    }

    paginate(builder, perPage, page) {

    }

    map(results) {

    }

    getTotalCount(results) {

    }

    flush(model) {

    }
}
