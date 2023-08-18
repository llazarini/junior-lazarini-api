import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lead from 'App/Models/Lead';
import { EmailService } from 'App/Services/Email';
import StoreValidator from 'App/Validators/Leads/StoreValidator'
import UpdateValidator from 'App/Validators/Leads/UpdateValidator';
import Excel from "exceljs";
import Application from "@ioc:Adonis/Core/Application";

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

    /**
	 * Export to XLSX
	 * @param param0
	 */
	public async exportExcel({ request, response, auth }) {
		const workbook = new Excel.Workbook();
		const worksheet = workbook.addWorksheet("Cars");

		worksheet.columns = [
			{ header: "Id", key: "id", width: 10 },
			{ header: "Nome", key: "name", width: 32 },
			{ header: "E-mail", key: "email", width: 20 },
			{ header: "País", key: "country", width: 20 },
			{ header: "Telefone", key: "phone", width: 20 },
			{ header: "Interessado em", key: "interested_in", width: 20 },
			{ header: "Importar como", key: "import_as", width: 30 },
            { header: "Descrição", key: "description", width: 30 },
			{ header: "Comentários", key: "comments", width: 30 },

		];

		let leads = Lead.query()
			.preload("country");

		(await leads).map((lead) => {
            worksheet.addRow({
				...lead.serialize(),
				country: lead.country?.name || "N/A",
                phone: `${lead.country?.countryCode} ${lead.phone}`
			})
        });

		const workBook = Application.tmpPath(
			`uploads/leads-excel.xlsx`
		);
		await workbook.xlsx.writeFile(workBook);
		response.download(workBook);
	}
}
