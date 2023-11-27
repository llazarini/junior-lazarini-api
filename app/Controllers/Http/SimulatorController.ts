import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bull from '@ioc:Rocketseat/Bull';
import Vehicles from 'App/Crawler/CustoJusto/Vehicles';
import Crawler from 'App/Jobs/CrawlerJob';
import Brand from 'App/Models/Brand';
import Extraction from 'App/Models/Extraction/Extraction';
import Fuel from 'App/Models/Fuel';
import { ISV } from 'App/Services/ISV';
import { IUC } from 'App/Services/IUC';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

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
        // 
        // Bull.add(new StandVirtualGetBrands().key, { getModels: true })
        const extractionHash = uuidv4()
        
        if (true) {

            const brands = await Brand
                .query()
                .orderBy('id', 'desc')
                .limit(3)

            const extraction = await Extraction.create({
                extractionHash,
                source: 'custo-justo',
                status: 'processing',
                extractionTotal: brands.length,
            })
    
            brands.map(brand => Bull.add(new Crawler().key, { 
                crawler: 'CustoJusto/Vehicles', 
                extractionId: 
                extraction.id, 
                brandId: brand.id 
            }))

            return
        }
       
        const brands = await Brand
            .query()
            .orderBy('id', 'desc')
            .limit(10)

        const extraction = await Extraction.create({
            extractionHash,
            source: 'stand-virtual',
            status: 'processing',
            extractionTotal: brands.length,
        })
        brands.map(brand => Bull.add(new Crawler().key, { 
            crawler: 'StandVirtual/Vehicles', 
            extractionId: 
            extraction.id, 
            brandId: brand.id 
        }))
    }
}
