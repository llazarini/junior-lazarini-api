import Route from '@ioc:Adonis/Core/Route'

// @Todo
Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/forgot-password', 'AuthController.forgotPassword')
    Route.post('/new-password', 'AuthController.newPassword')
    Route.post('/check-token/:token', 'AuthController.checkToken')

    Route.group(() => {
        Route.get('/me', 'AuthController.me')
        Route.get('/notifications', 'AuthController.notifications')
        Route.post('/notifications/clear/:id', 'AuthController.clear')
        Route.post('/notifications/clear-all', 'AuthController.clearAll')
    }).middleware(["auth"]);

}).prefix("auth");
