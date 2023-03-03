import Route from '@ioc:Adonis/Core/Route'

// @Todo
Route.group(() => {
    Route.get('/index', 'ApiController.index')
    Route.post('/store', 'ApiController.store')
    Route.delete('/delete', 'ApiController.delete')
})
.middleware(['auth'])
.prefix("api");
