'use strict'

class Querify {
  register (Model) {
    Model.getFromQuery = (query) => {
      this.model = Model;
      return this.getModelQuery(query)
    }
  }

  getModelQuery(query) {
    
    let modelQuery = this.model.query();
    modelQuery = this.getRelationships(query.relationships, modelQuery);
    modelQuery = this.getFilters(query.filter, modelQuery);

  return modelQuery;
}

/**
 * get all the ralationships in the query
 * @param {String} relationships 
 * @return Array
 */
getRelationships(relationships, modelQuery) {
  if (relationships) {
    relationships = relationships.split(',').map(relation => relation.trim());

    relationships.forEach((relation) => {
      modelQuery.with(relation);
    })
  }

  return modelQuery
}

getFilters(filters, modelQuery) {
  if (filters) {
    console.log(filters)
    filters = Object.entries(filters);
    filters.forEach( filter => {
      const [field, value] = filter;
      this.addFilter(field, value, modelQuery)
    })
  }

  return modelQuery
}


  addFilter(field, value, modelQuery) {
    const optionalValues = value.split(',').map( optional => optional.trim());
    optionalValues.forEach( (optionalValue, index) => {
      let where = "where"
      if (index) {
        where = "orWhere"
      }

      switch (optionalValue.slice(0,1)) {
        case '>':
          modelQuery[where](field, ">", optionalValue.slice(1))
          break;
        case '<':
          modelQuery[where](field, "<", optionalValue.slice(1))
          break;
        case '%':
          modelQuery[where](field,'LIKE', optionalValue)
          break;
        case '~':
          modelQuery[`${were}Not`](field, optionalValue.slice(1))
          break;
        case '$':
          modelQuery[`${were}Null`](field, optionalValue.slice(1))
          break;
        default:
          modelQuery[where](field, optionalValue)
          break;
      }
    })

  }
}

module.exports = Querify
