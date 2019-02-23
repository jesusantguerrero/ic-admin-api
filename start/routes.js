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

Route.group(() => {
    Route.resource('items', 'ItemController').apiOnly()
    Route.resource('tickets', 'TicketController').apiOnly()
    Route.resource('labels', 'LabelController').apiOnly()
}).prefix('api/v1').middleware('auth')


Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('registration', 'AuthController.registration')
}).prefix('api/v1/auth').middleware('guest')

