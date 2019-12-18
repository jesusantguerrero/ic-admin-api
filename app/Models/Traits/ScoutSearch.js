'use strict'
const SearchJobs = use('App/Domain/Search/Jobs/Index');

class ScoutSearch {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    
    Model.queryMacro('search', function (value) {
      this.table(Model.searchTable).whereRaw(`MATCH('${value}')`);
      return this;
    })
    
    Model.addHook('beforeUpdate', function(modelInstance) {
      Model.useConnection = false;
    })

    Model.addHook('afterCreate', function (modelInstance) {
      modelInstance.toSearchableArray();
    })

    Model.addHook('afterSave', function (modelInstance) {
      SearchJobs.add({model: modelInstance, newRecord: modelInstance.toJSON()})
      return
    })
    
    Model.addHook('afterUpdate', function (modelInstance) {
      SearchJobs.add({model: modelInstance, newRecord: modelInstance.toJSON()})
      return
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
