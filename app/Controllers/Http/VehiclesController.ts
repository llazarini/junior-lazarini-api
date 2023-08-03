import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand';
import Model from 'App/Models/Model';
import Optional from 'App/Models/Optional';
import Vehicle from 'App/Models/Vehicle';
import VehicleOptional from 'App/Models/VehicleOptional';
import VehicleType from 'App/Models/VehicleType';
import StoreValidator from 'App/Validators/Vehicles/StoreValidator'
import UpdateValidator from 'App/Validators/Vehicles/UpdateValidator';
import { HttpRequest } from 'aws-sdk';

export default class VehiclesController {

    public async index({ request, response }: HttpContextContract) { 
        const { maxPrice, vehicleTypes, search, onlyImages } = request.qs();
        let vehicles = Vehicle
            .query()
            .preload('model')
            .preload('brand')
            .preload('image')
            .preload('images')
            .preload('ads')
            .where((query) => {
                if (!search) {
                    return;
                } 
                query.orWhereHas('model', (q) => q.orWhere('name', 'like', `%${search}%`))
                query.orWhereHas('brand', (q) => q.orWhere('name', 'like', `%${search}%`))
                query.orWhereILike('year', search)
            })
            .where((query) => {
                if (vehicleTypes) {
                    query.whereIn('vehicle_type_id', vehicleTypes.split(','))
                }
                if (maxPrice) {
                    query.where('price', '<=', maxPrice)
                }
            });

        if (onlyImages) {
            vehicles = vehicles.whereHas('image', () => {});
        }

        vehicles = await vehicles.paginate(request.input('page'), 10);
        
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

    public async vehicleTypes({ }: HttpContextContract) {
        const vehicleTypes = await VehicleType
            .query();
        
        return vehicleTypes;
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
        const vehicleTypes = await VehicleType.all();
        const optionals = await Optional.all();
        
        return {
            brands,
            models,
            vehicleTypes,
            optionals,
        }
    }

    public async update({ request, response }: HttpContextContract) {
        await request.validate(UpdateValidator);
        
        const vehicle = await Vehicle.find(request.input('id'));
        vehicle?.merge(request.except(['request_token']));
        if (!vehicle || !await vehicle?.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }

        // Update vehicle optionals
        if (!await this.updateOptionals(vehicle, request)) {
            return response.badRequest({
                message: "Error when trying to save the optionals."
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
            .preload('fuel')
            .preload('optionals')
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
        vehicle.merge(request.except(['request_token']));
        if (!await vehicle.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }

        // Update images
        await Vehicle.updateImages(vehicle, request.input('request_token'));

        // Update vehicle optionals
        if (!await this.updateOptionals(vehicle, request)) {
            return response.badRequest({
                message: "Error when trying to save the optionals."
            })
        }

        return {
            message: "Success when saving the register."
        }
    }

    private async updateOptionals(vehicle: Vehicle, request: any) {
        await VehicleOptional
            .query()
            .where('vehicleId', vehicle.id)
            .delete();
            
        await Promise.allSettled(
            request.input('optionals').map(async (item) => {
                await VehicleOptional.create({
                    vehicleId: vehicle.id,
                    optionalId: item.id,
                })
            })
        )

        return true;
    }

    public async delete({ request, response }: HttpContextContract) {
        const id = request.param('id');
        const vehicle = await Vehicle.find(id);

        await vehicle?.delete();
        return {
            message: 'Vehicle successfully removed.'
        }
    }
}
