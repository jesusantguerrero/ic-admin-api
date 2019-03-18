'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.on('/api/v1/status', ({
  response
}) => {
  response.json({
    "status": "working"
  })
})

Route.group(() => {
  Route.resource('items', 'ItemController').apiOnly()

  // Company Section
  Route.resource('users', 'UserController').apiOnly()
  Route.resource('companies', 'CompanyController').apiOnly()
  Route.resource('clients', 'ClientController').apiOnly()

  // Business
  Route.resource('routers', 'RouterController').apiOnly()
  Route.resource('services', 'ServiceController').apiOnly()
  Route.resource('prices', 'PriceController').apiOnly()
  Route.resource('contracts', 'ContractController').apiOnly()
  Route.resource('payments', 'PaymentController').apiOnly()

  // issues section
  Route.resource('tickets', 'TicketController').apiOnly()
  Route.resource('labels', 'LabelController').apiOnly()
  Route.resource('milestones', 'MilestoneController').apiOnly()

}).prefix('api/v1').middleware('auth')


Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('registration', 'AuthController.registration')
}).prefix('api/v1/auth').middleware('guest')

Route.group(() => {
  Route.get('user', 'AuthController.currentUser')
}).prefix('api/v1/auth').middleware('auth')
