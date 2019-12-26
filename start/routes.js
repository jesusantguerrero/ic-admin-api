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

Route.get('/api/v1/status', ({
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
    Route.resource('ip-addresses', 'IpAddressController').apiOnly()
    Route.resource('services', 'ServiceController').apiOnly()
    Route.resource('prices', 'PriceController').apiOnly()
    Route.resource('contracts', 'ContractController').apiOnly()
    Route.post('contracts/:id/extend', 'ContractController.extend')

    Route.resource('payments', 'PaymentController').apiOnly()
    Route.resource('payment_docs', 'PaymentDocsController').apiOnly()

    // Accounting
    Route.resource('line-items', 'LineItemController').apiOnly()
    Route.resource('invoices', 'InvoiceController').apiOnly()
    Route.post('invoices/:id/clone', 'InvoiceController.clone')
    Route.post('invoices/:id/payment', 'InvoiceController.addPayment')
    Route.post('invoices/:id/payment/:contractId', 'InvoiceController.addPayment')
    Route.delete('invoices/:id/payment/:paymentId', 'InvoiceController.deletePayment')
    Route.post('invoices/send', 'InvoiceController.sendEmail')

    Route.resource('transaction-lines', 'TransactionLineController').apiOnly()
    Route.resource('transactions', 'TransactionController').apiOnly()
    Route.post('transaction/:id/clone', 'TransactionController.clone')

    Route.resource('accounts', 'AccountController').apiOnly()
    Route.resource('categories', 'CategoryController').apiOnly()
    // Route.resource('transactions', 'ContractServiceController').apiOnly()

    // issues section
    Route.resource('tickets', 'TicketController').apiOnly()
    Route.resource('labels', 'LabelController').apiOnly()
    Route.resource('milestones', 'MilestoneController').apiOnly()

    // toggl timing
    Route.resource('time-entries', 'TimeEntryController').apiOnly()
    
    // reports
    Route.get('reports/', 'ReportController.index')
    Route.get('reports/:id', 'ReportController.index')


}).prefix('api/v1').middleware('auth')

Route.group(() => {
    // toggl timing
    Route.resource('timers', 'TimerController').apiOnly()
}).prefix('api')


Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('registration', 'AuthController.registration')
}).prefix('api/v1/auth')

Route.group(() => {
  Route.get('user', 'AuthController.currentUser')
}).prefix('api/v1/auth').middleware('auth')
