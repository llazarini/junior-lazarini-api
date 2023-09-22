import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ISV } from 'App/Services/ISV';

export default class SimulatorController {

    public async isv({ request, response }: HttpContextContract) { 
        const { cm3, co2, isGasoleo, carValue, wltp, isHybrid, isHybridPlugin, addExpenses, ue, age } = request.all();

        console.log(isGasoleo)
        const calcs = ISV.calculate({ 
            cm3: +cm3, 
            co2: +co2, 
            isGasoleo: isGasoleo != '0', 
            carValue: +carValue, 
            wltp: wltp != '0', 
            isHybrid: isHybrid != '0', 
            isHybridPlugin: isHybridPlugin != '0', 
            addExpenses: addExpenses != '0',
            age: +age,
            isUE: ue != '0',
        });
    
        return calcs;
    }
}
