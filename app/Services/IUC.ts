import { Exception } from "@adonisjs/core/build/standalone";
import Fuel from "App/Models/Fuel";
import { DateTime } from "luxon";

export class IUC {
    /**
     * Calculate the ISV
     * @param inputCm3 
     * @param inputCo2 
     * @param fuel.slug === "diesel" 
     * @param carValue 
     * @param wltp 
     * @param addExpenses 
     * @returns 
     */
    static calculate ({ firstRegistration, cm3, co2, fuel, wltp, nedc, log }: { firstRegistration: DateTime, cm3: number, co2: number, fuel: Fuel, wltp: boolean, nedc: boolean, log: boolean })
    {  
        const currentYear = DateTime.now().year
        let coeficienteAnoMatricula = 0
        let aditionalTaxGasoleo = 0
        let taxCm3 = 0
        let taxCo2 = 0
        let additionaltaxCo2 = 0
        let resultIuc = 0
        let resultIucCm3 = 0
        let resultIucCo2 = 0
        let resultIucAdditionalCo2 = 0
        let resultIucCoef = 0
        let resultIucAditional = 0
		
		if (fuel.slug === "eletric" || firstRegistration.year <= 1980) {
			return {
				total: resultIuc, 
				iuc: resultIuc, 
				iucCm3Component: resultIucCm3, 
				iucCo2Component: resultIucCo2, 
				iucAdditionalCo2: resultIucAdditionalCo2, 
				iucCoef: resultIucCoef, 
				iucAdditional: resultIucAditional
			}
		} else if (firstRegistration.year >= 2007) {
			if (firstRegistration >= DateTime.fromFormat('2007-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2007-01-01', 'yyyy-MM-dd').endOf('year')) { 
				coeficienteAnoMatricula = 1;
            } else if (firstRegistration >= DateTime.fromFormat('2008-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2008-01-01', 'yyyy-MM-dd').endOf('year')) {
				coeficienteAnoMatricula = 1.05;
            } else if (firstRegistration >= DateTime.fromFormat('2009-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2009-01-01', 'yyyy-MM-dd').endOf('year')) {
				coeficienteAnoMatricula = 1.1;
            } else if (firstRegistration >= DateTime.fromFormat('2010-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2016-01-01', 'yyyy-MM-dd').endOf('year')) {
				coeficienteAnoMatricula = 1.15;
            } else {
				coeficienteAnoMatricula = 1.15;
			}

			if (cm3 <= 1250) {
				taxCm3 = 30.87
				aditionalTaxGasoleo = 5.02;
			} else if (cm3 <= 1750) {
				taxCm3 = 61.94;
				aditionalTaxGasoleo = 10.07;
			} else if (cm3 <= 2500) {
				taxCm3 = 123.76;
				aditionalTaxGasoleo = 20.12;
			} else {
				taxCm3 = 423.55;
				aditionalTaxGasoleo = 68.85;
			};
			
			if (!(firstRegistration >= DateTime.fromFormat('2017-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2023-01-01', 'yyyy-MM-dd').endOf('year') && wltp)) {
				if (co2 <= 120) {
					taxCo2 = 63.32;
				} else if (co2 <= 180) {
					taxCo2 = 94.88;
				} else if (co2 <= 250) {
					taxCo2 = 206.07;
				} else {
					taxCo2 = 353.01
				} 
			} else {
				if (co2 <= 140) {
					taxCo2 = 63.32;
				} else if (co2 <= 205) {
					taxCo2 = 94.88;
				} else if (co2 <= 260) {
					taxCo2 = 206.07;
				} else {
					taxCo2 = 353.01;
				} 
			};
			
			console.log("IUC -> ", taxCo2, taxCm3)

            // 181 até 250g/km
			if (co2 >= 181 && co2 <= 250 && (firstRegistration >= DateTime.fromFormat('2017-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2023-01-01', 'yyyy-MM-dd').endOf('year') && wltp || 
                firstRegistration >= DateTime.fromFormat('2017-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2019-01-01', 'yyyy-MM-dd').endOf('year') && nedc)) {
				additionaltaxCo2 = 30.87;
			} else if (co2 == 4 && (firstRegistration >= DateTime.fromFormat('2017-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2023-01-01', 'yyyy-MM-dd').endOf('year') && wltp || 
                firstRegistration >= DateTime.fromFormat('2017-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2019-01-01', 'yyyy-MM-dd').endOf('year') && nedc)) {
				additionaltaxCo2 = 61.94;
			} else {
				additionaltaxCo2 = 0;
			};

			if (!["diesel", "hybrid-diesel", "hybrid-plugin-diesel"].includes(fuel.slug)) {
				aditionalTaxGasoleo = 0
			}

			console.log("IUC -> Coef matricula", coeficienteAnoMatricula)
			
            resultIuc = +(((taxCm3 + taxCo2 + additionaltaxCo2) * coeficienteAnoMatricula) + aditionalTaxGasoleo).toFixed(2)
            resultIucCm3 = taxCm3
            resultIucCo2 = taxCo2
            resultIucAdditionalCo2 = additionaltaxCo2
            resultIucCoef = coeficienteAnoMatricula
            resultIucAditional = aditionalTaxGasoleo
    
		} else if (firstRegistration.year >= 1981) {
			let taxCm3 = 0, taxCo2 = 0
			if (cm3 <= 1250) {
				taxCm3 = 30.87;
			} else if (cm3 <= 1750) {
				taxCm3 = 61.94;
			} else if (cm3 <= 2500) {
				taxCm3 = 123.76;
			} else {
				taxCm3 = 423.55;
			};

			if (co2 == null) {
				if (co2 <= 1500) {
					taxCo2 = 63.32;
				} else if (co2 <= 3000) {
					taxCo2 = 94.88;
				} else if (co2 <= 4000) {
					taxCo2 = 206.07;
				} else {
					taxCo2 = 353.01;
				};
			} else if (co2 <= 120) {
				taxCo2 = 63.32;
			} else if (co2 <= 180) {
				taxCo2 = 94.88;
			} else if (co2 <= 250) {
				taxCo2 = 206.07;
			} else if (co2 ) {
				taxCo2 = 353.01;
			}  
			
		
            resultIucCm3 = taxCm3
			resultIucCo2 = taxCo2
            resultIucAditional = 0
            resultIuc = (taxCm3 + taxCo2)
		} 

        const totals = {
            total: resultIuc, 
            iuc: resultIuc, 
			iucCm3Component: resultIucCm3, 
			iucCo2Component: resultIucCo2, 
			iucAdditionalCo2: resultIucAdditionalCo2, 
			iucCoef: resultIucCoef, 
			iucAdditional: resultIucAditional
        }
		console.log("IUC -> ", totals)
		return totals
	}
}