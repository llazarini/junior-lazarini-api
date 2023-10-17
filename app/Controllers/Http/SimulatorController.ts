import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fuel from 'App/Models/Fuel';
import { ISV } from 'App/Services/ISV';

export default class SimulatorController {

    public async dataprovider({ request, response }: HttpContextContract) { 
        return {
            fuels: await Fuel.all()
        };
    }


    public async isv({ request, response }: HttpContextContract) { 
        const { cm3, co2, carValue, wltp, addExpenses, ue, age, fuelId } = request.all();

        const fuel = await Fuel.find(fuelId);

        if (!fuel) {
            return response.badRequest({
                message: "O combustível não foi informado."
            })
        }

        const calcs = ISV.calculate({ 
            cm3: +cm3, 
            co2: +co2, 
            isGasoleo: fuel.slug == "gas", 
            carValue: 0, 
            wltp: wltp != '0', 
            isHybrid: fuel.slug == "hybrid", 
            isHybridPlugin: fuel.slug == "hybrid-plugin", 
            addExpenses: false,
            age: +age,
            isUE: ue != '0',
        });
    
        return calcs;
    }
}
