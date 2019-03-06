'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tickets
 */
class CrudController {
  constructor(model) {
    this.model = model;
  }
  
  getModelQuery(query) {
    const relationships = this.getRelationships(query.relationships);
    console.log(relationships);

    const modelQuery = this.model.query();
    if (relationships) {
      relationships.forEach((relation) => {
        modelQuery.with(relation);
      })
    }

    return modelQuery;
  }

  /**
   * get all the ralationships in the query
   * @param {String} relationships 
   * @return Array
   */
  getRelationships(relationships) {
    if (relationships) {
      return relationships.split(',').map(relation => relation.trim());
    }
  }
}

module.exports = CrudController
