import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Interest from 'App/Models/Interest';
import Target from 'App/Models/Target';
import StoreValidator from 'App/Validators/Targets/StoreValidator';
import UpdateValidator from 'App/Validators/Targets/UpdateValidator';

export default class TargetsController {

    public async index({ request, response }: HttpContextContract) { 
        const { search } = request.qs();
        
        const models = await Target
            .query()
            .paginate(request.input('page'), 10);
    
        return models;
    }

    public async update({ request, response }: HttpContextContract) {
        await request.validate(UpdateValidator);
        
        const model = await Target.find(request.input('id'));
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
        const model = await Target
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
        
        const model = new Target();
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

    public async dataprovider() {
        const interests = await Interest.all();

        return { interests }
    }
}
