import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand';
import Model from 'App/Models/Model';
import Vehicle from 'App/Models/Vehicle';
import StoreValidator from 'App/Validators/Vehicles/StoreValidator'
import UpdateValidator from 'App/Validators/Vehicles/UpdateValidator';

export default class VehiclesController {

    public async index({ request, response }: HttpContextContract) {
        
        const vehicles = await Vehicle
            .query()
            .preload('model')
            .preload('brand')
            .preload('image')
            .preload('images')
            .where((query) => {
                if (request.input('brandId')) {
                    query.whereIn('brand_id', request.input('brandId').split(','))
                }
                if (request.input('modelId')) {
                    query.whereIn('model_id', request.input('modelId').split(','))
                }
                if (request.input('minPrice')) {
                    query.where('price', '>=', request.input('minPrice'))
                }
                if (request.input('maxPrice')) {
                    query.where('price', '<=', request.input('maxPrice'))
                }
            })
            .whereHas('image', () => {})
            .paginate(request.param('page'), 12);
        
        return vehicles;
    }

    public async recentVehicles({ }: HttpContextContract) {
        const vehicles = await Vehicle
            .query()
            .preload('model')
            .preload('brand')
            .preload('image')
            .preload('images')
            .whereHas('image', () => {})
            .limit(8);
        
        return vehicles;
    }

    public async similarVehicles({ }: HttpContextContract) {
        const vehicles = await Vehicle
            .query()
            .preload('model')
            .preload('brand')
            .preload('image')
            .preload('images')
            .whereHas('image', () => {})
            .limit(4);
        
        return vehicles;
    }


    public async dataprovider({ }: HttpContextContract) {
        const brands = await Brand.all();
        const models = await Model.all();
        
        return {
            brands,
            models,
        }
    }

    public async update({ request, response }: HttpContextContract) {
        await request.validate(UpdateValidator);
        
        const vehicle = await Vehicle.find(request.input('id'));
        vehicle?.merge(request.all());
        if (!await vehicle?.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return {
            message: "Success when saving the register."
        }
    }

    public async show({ request, response }: HttpContextContract) {
        const vehicle = await Vehicle
            .query()
            .preload('model')
            .preload('brand')
            .preload('images')
            .where('id', request.param('id'))
            .first();
        
        if (!vehicle) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return vehicle;
    }


    public async store({ request, response }: HttpContextContract) {
        await request.validate(StoreValidator);
        
        const vehicle = new Vehicle();
        vehicle.merge(request.all());
        if (!await vehicle.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return {
            message: "Success when saving the register."
        }
    }
}
