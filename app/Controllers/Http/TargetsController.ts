import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Interest from 'App/Models/Interest';
import Target from 'App/Models/Target';
import TargetInterest from 'App/Models/TargetInterest';
import TargetState from 'App/Models/TargetState';
import StoreValidator from 'App/Validators/Targets/StoreValidator';
import UpdateValidator from 'App/Validators/Targets/UpdateValidator';

export default class TargetsController {

    public async index({ request, response }: HttpContextContract) { 
        const { search } = request.qs();
        
        const models = await Target
            .query()
            .preload('country')
            .preload('states')
            .preload('interests')
            .paginate(request.input('page'), 10);
    
        return models;
    }

    public async update({ request, response }: HttpContextContract) {
        await request.validate(UpdateValidator);
        
        const target = await Target.find(request.input('id'));
        target?.merge(request.all());

        if (!target || !await target.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }

        // Save relations
        if (!await this.saveRelations({ target, states: request.input('states'), interests: request.input('interests') })) {
            return response.badRequest({
                message: "Error when trying to save the register relations."
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
            .preload('states')
            .preload('interests')
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
        
        const target = new Target();
        target.merge(request.all());
        if (!await target.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }

        // Save relations
        if (!await this.saveRelations({ target, states: request.input('states'), interests: request.input('interests') })) {
            return response.badRequest({
                message: "Error when trying to save the register relations."
            })
        }
    
        return {
            message: "Success when saving the register."
        }
    }

    private async saveRelations({ target, states, interests }: { target: Target, states: number[], interests: number[]}) {
        await TargetState
            .query()
            .where('target_id', target.id)
            .delete()
        await TargetInterest
            .query()
            .where('target_id', target.id)
            .delete()
        await TargetState.createMany(states.map(id => {
            return {
                targetId: target.id,
                stateId: id,
            }
        }))
        await TargetInterest.createMany(interests.map(id => {
            return {
                targetId: target.id,
                interestId: id,
            }
        }))

        return true;
    }

    public async dataprovider() {
        const interests = await Interest.all();

        return { interests }
    }



    public async delete({ request, response, auth }: HttpContextContract) {
        const id = request.param('id');

        await TargetState
            .query()
            .where('target_id', id)
            .delete();

        await TargetInterest
            .query()
            .where('target_id', id)
            .delete();

        const target = await Target.find(id);
        await target?.delete();
        return {
            message: 'Target successfully removed.'
        }
    }
}
