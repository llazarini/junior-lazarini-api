import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Model from 'App/Models/Model';
import StoreValidator from 'App/Validators/Models/StoreValidator';
import UpdateValidator from 'App/Validators/Models/UpdateValidator';

export default class ModelsController {

    public async index({ request, response }: HttpContextContract) { 
        const { search } = request.qs();
        
        const models = await Model
            .query()
            .paginate(request.param('page'), 12);
    
        return models;
    }

    public async update({ request, response }: HttpContextContract) {
        await request.validate(UpdateValidator);
        
        const model = await Model.find(request.input('id'));
        model?.merge(request.all());
        if (!await model?.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return {
            message: "Success when saving the register."
        }
    }

    public async show({ request, response }: HttpContextContract) {
        const model = await Model
            .query()
            .where('id', request.param('id'))
            .first();
        
        if (!model) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return model;
    }

    public async store({ request, response }: HttpContextContract) {
        await request.validate(StoreValidator);
        
        const model = new Model();
        model.merge(request.all());
        if (!await model.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return {
            message: "Success when saving the register."
        }
    }
}
