const Database = use('Database');

class SearchAction {
    constructor(model) {
        this.model = model;
    }

    update(model) {

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
