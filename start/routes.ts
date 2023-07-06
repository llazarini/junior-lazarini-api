/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
    return { api: 'v1' }
})

import "../routes/auth"
import "../routes/images"
import "../routes/leads"
import "../routes/vehicles"
import "../routes/brands"
import "../routes/models"
import "../routes/simulator"
import "../routes/social"
import "../routes/users"
import "../routes/targets"
import "../routes/localization"
import "../routes/ads"