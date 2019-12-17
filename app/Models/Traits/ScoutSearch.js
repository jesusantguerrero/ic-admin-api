'use strict'

class ScoutSearch {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.useConnection = Model.searchable ? "mysql_read" : false;

    Model.queryMacro('search', function (value) {
      this.table(Model.searchTable).whereRaw(`MATCH('${value}')`);
      return this;
    })

    Model.addHook('afterCreate', function (modelInstance) {
      modelInstance.toSearchableArray();
    })

    Model.addHook('afterSave', function (modelInstance) {
      modelInstance.toSearchableArray();

    })

    Model.addHook('afterUpdate', function (modelInstance) {
      modelInstance.toSearchableArray();

    })

    Model.addHook('afterDelete', function (modelInstance) {
      modelInstance.toSearchableArray();

    })

    Model.prototype.toSearchableArray = function () {
      return this.toJSON();
    }
  }
}

module.exports = ScoutSearch
