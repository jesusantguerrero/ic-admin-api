'use strict'

const BaseController = require('./BaseController');
const Category = use('App/Models/Category')

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController extends BaseController{
  constructor() {
    super(Category)
  }  
}

module.exports = CategoryController
