import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lead from 'App/Models/Lead';
import StoreValidator from 'App/Validators/Leads/StoreValidator'
import UpdateValidator from 'App/Validators/Leads/UpdateValidator';

export default class LeadsController {

    public async dataprovider({ request, response }: HttpContextContract) {
        const carTypes = []

        return {

        }
    }

    public async update({ request, response }: HttpContextContract) {
        await request.validate(UpdateValidator);
        
        const lead = await Lead.find(request.input('id'));
        lead?.merge(request.all());
        if (!await lead?.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return {
            message: "Success when saving the register."
        }
    }

    public async store({ request, response }: HttpContextContract) {
        await request.validate(StoreValidator);
        
        const lead = new Lead();
        lead.merge(request.all());
        if (!await lead.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return {
            message: "Success when saving the register."
        }
    }
}
