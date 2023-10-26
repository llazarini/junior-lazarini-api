import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand';
import StoreValidator from 'App/Validators/Brands/StoreValidator';
import UpdateValidator from 'App/Validators/Brands/UpdateValidator';

export default class BrandsController {

    public async index({ request, response }: HttpContextContract) { 
        const { search } = request.qs();
        
        const brands = await Brand
            .query()
            .paginate(request.input('page'), 10);
    
        return brands;
    }

    public async update({ request, response }: HttpContextContract) {
        await request.validate(UpdateValidator);
        
        const brand = await Brand.find(request.input('id'));
        brand?.merge(request.all());
        if (!await brand?.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return {
            message: "Success when saving the register."
        }
    }

    public async show({ request, response }: HttpContextContract) {
        const brand = await Brand
            .query()
            .where('id', request.param('id'))
            .first();
        
        if (!brand) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return brand;
    }

    public async store({ request, response }: HttpContextContract) {
        await request.validate(StoreValidator);
        
        const brand = new Brand();
        brand.merge(request.all());
        if (!await brand.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return {
            message: "Success when saving the register."
        }
    }

    public async delete({ request, response }: HttpContextContract) {
        const id = request.param('id');
        const brand = await Brand.find(id);
        if (!brand) {
            return response.badRequest({
                message: 'Não foi possível encontrar a marca.'
            })
        }
        await brand.delete();
        return {
            message: 'A marca foi removida com sucesso.'
        }
    }
}
