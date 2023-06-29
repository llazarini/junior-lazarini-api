import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/Country';
import State from 'App/Models/State';

export default class LocalizationController {

    public async countries({ request, response }: HttpContextContract) { 
        const { search } = request.qs();
        
        const countries = await Country
            .query()
            .where(query => {
                if (search) {
                    query.where('name', search)
                }
            });
    
        return countries;
    }
   
    public async states({ request, response }: HttpContextContract) { 
        const { search, country_id } = request.qs();
        
        const states = await State
            .query()
            .where(query => {
                if (search) {
                    query.where('name', search)
                }
                if (country_id) {
                    query.where('country_id', country_id)
                }
            });
    
        return states;
    }
}
