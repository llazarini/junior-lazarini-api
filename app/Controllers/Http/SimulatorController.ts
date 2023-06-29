import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ISV } from 'App/Services/ISV';

export default class SimulatorController {

    public async isv({ request, response }: HttpContextContract) { 
        const { cm3, co2, isGasoleo, carValue, isEmissoesWLTP, isHybrid, isHybridPlugin, addExpenses } = request.all();

        const calcs = ISV.calculate({ 
            cm3: +cm3, 
            co2: +co2, 
            isGasoleo, 
            carValue, 
            isEmissoesWLTP, 
            isHybrid, 
            isHybridPlugin, 
            addExpenses 
        });
    
        return calcs;
    }
}
