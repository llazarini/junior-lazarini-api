import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm';
import Lead from 'App/Models/Lead';
import { EmailService } from 'App/Services/Email';
import StoreValidator from 'App/Validators/Leads/StoreValidator'
import UpdateValidator from 'App/Validators/Leads/UpdateValidator';

export default class LeadsController {

    /**
	 * Index
	 * @param param0
	 * @returns
	 */
	public async index({ request, response }) {
		const { search, sort, direction } = request.qs();
		let leads: any = Lead.query()
            .preload('country')

		if (search) {
			leads.whereILike("name", `%${search}%`);
			leads.orWhereILike("code", `%${search}%`);
		}
    
		leads = await leads
            .orderBy('id', 'desc')
            .paginate(request.input("page") || 1);

		return response.json(leads);
	}

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
        lead.companyId = 1;
        if (!await lead.save()) {
            return response.badRequest({
                message: "Ocorreu um erro ao tentar salvar."
            })
        }

        const title = lead.interestedIn === 'mentoring' ? "Mentoria de Importação de Carros" : (
            lead.interestedIn === 'vehicle' ? `Interesse em ${lead.description}` : "E-book de Importação de Carros"
        )
        
        // Envia o email para o lead
        await EmailService.send(lead.email, title, `emails/leads/${lead.interestedIn}`, lead)

        return {
            message: "Sucesso ao cadastrar lead.",
            id: lead.id,
        }
    }
}
