import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/index', 'UsersController.index')
    Route.get('/show/:id', 'UsersController.show')
    Route.get('/dataprovider', 'UsersController.dataprovider')
    Route.post('/store', 'UsersController.store')
    Route.put('/update', 'UsersController.update')
    Route.delete('/delete', 'UsersController.delete')
    Route.post('/send-email-notification/:id', 'UsersController.sendEmailNotification')
})
    .middleware(['auth'])
    .prefix('users')

Route.get('/users/advisors/:storeId', 'UsersController.advisors')
Route.get('/users/export/:fileName', 'UsersController.export');
Route.post('/users/configure/:code', 'UsersController.configureAuth');