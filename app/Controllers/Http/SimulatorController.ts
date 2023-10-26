import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bull from '@ioc:Rocketseat/Bull';
import GetDataProviders from 'App/Jobs/Crawler/StandVirtual/GetDataProviders';
import Fuel from 'App/Models/Fuel';
import { ISV } from 'App/Services/ISV';
import { IUC } from 'App/Services/IUC';
import { DateTime } from 'luxon';
import { Builder, By } from 'selenium-webdriver'

export default class SimulatorController {

    public async dataprovider({ request, response }: HttpContextContract) { 
        return {
            fuels: await Fuel.all(),
            calculationYears: [2023, 2024]
        };
    }


    public async simulate({ request, response }: HttpContextContract) { 
        let { cm3, co2, carValue, wltp, ue, firstRegistration, fuelId, calculationYear } = request.all();

        const fuel = await Fuel.find(fuelId);

        if (!fuel) {
            return response.badRequest({
                message: "O combustível não foi informado."
            })
        }
        firstRegistration = DateTime.fromISO(firstRegistration)

        const isv = ISV.calculate({ 
            cm3: +cm3, 
            co2: +co2, 
            fuel,
            carValue: +carValue, 
            wltp: wltp != '0', 
            firstRegistration,
            isUE: ue != '0',
            calculationYear: +calculationYear,
            log: false
        });

        const iuc = IUC.calculate({ 
            cm3: +cm3, 
            co2: +co2, 
            fuel,
            wltp: wltp != '0', 
            nedc: !(wltp != '0'), 
            firstRegistration,
            log: true
        });
    
        return {
            isv, 
            iuc
        };
    }

    public async crawler() {
        Bull.add(new GetDataProviders().key, {})
    }
}
