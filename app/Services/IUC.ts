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
    static calculate ({ firstRegistration, cm3, co2, fuel, wltp, nedc }: { firstRegistration: DateTime, cm3: number, co2: number, fuel: Fuel, wltp: boolean, nedc: boolean})
    {  
        const currentYear = DateTime.now().year
        let coeficienteAnoMatricula = 0
        let aditionalTaxGasoleo = 0
        let taxCm3 = 0
        let taxCo2 = 0
        let additionalCo2Tax = 0
        let resultIuc = 0
        let resultIucCm3 = 0
        let resultIucCo2 = 0
        let resultIucAdditionalCo2 = 0
        let resultIucCoef = 0
        let resultIucAditional = 0
		
		if (fuel.slug === "eletric") {
			return {
				total: resultIuc, 
				iuc: resultIuc, 
				iucCm3Component: resultIucCm3, 
				iucCo2Component: resultIucCo2, 
				iucAdditionalCo2: resultIucAdditionalCo2, 
				iucCoef: resultIucCoef, 
				iucAdditional: resultIucAditional
			}
		}

        if (firstRegistration.year >= currentYear - 2007) {
			if (firstRegistration >= DateTime.fromFormat('2007-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2007-01-01', 'yyyy-MM-dd').endOf('year')) { 
				coeficienteAnoMatricula = 1;
            } else if (firstRegistration >= DateTime.fromFormat('2008-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2008-01-01', 'yyyy-MM-dd').endOf('year')) {
				coeficienteAnoMatricula = 1.05;
            } else if (firstRegistration >= DateTime.fromFormat('2009-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2009-01-01', 'yyyy-MM-dd').endOf('year')) {
				coeficienteAnoMatricula = 1.1;
            } else if (firstRegistration >= DateTime.fromFormat('2010-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2016-01-01', 'yyyy-MM-dd').endOf('year')) {
				coeficienteAnoMatricula = 1.15;
            } else if (firstRegistration >= DateTime.fromFormat('2017-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2019-01-01', 'yyyy-MM-dd').endOf('year') && nedc) {
				coeficienteAnoMatricula = 1.15;
			} else if (firstRegistration >= DateTime.fromFormat('2017-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2023-01-01', 'yyyy-MM-dd').endOf('year') && wltp) {
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
			
            // 181 até 250g/km
			if (co2 >= 181 && co2 <= 250 && (firstRegistration >= DateTime.fromFormat('2017-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2023-01-01', 'yyyy-MM-dd').endOf('year') && wltp || 
                firstRegistration >= DateTime.fromFormat('2017-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2019-01-01', 'yyyy-MM-dd').endOf('year') && nedc)) {
				additionalCo2Tax = 30.87;
			} else if (co2 == 4 && (firstRegistration >= DateTime.fromFormat('2017-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2023-01-01', 'yyyy-MM-dd').endOf('year') && wltp || 
                firstRegistration >= DateTime.fromFormat('2017-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2019-01-01', 'yyyy-MM-dd').endOf('year') && nedc)) {
				additionalCo2Tax = 61.94;
			} else {
				additionalCo2Tax = 0;
			};

			if (!["diesel", "hybrid-diesel", "hybrid-plugin-diesel"].includes(fuel.slug)) {
				aditionalTaxGasoleo = 0
			}
			
            resultIuc = +(((taxCm3 + taxCo2 + additionalCo2Tax) * coeficienteAnoMatricula) + aditionalTaxGasoleo).toFixed(2)
            resultIucCm3 = taxCm3
            resultIucCo2 = taxCo2
            resultIucAdditionalCo2 = additionalCo2Tax
            resultIucCoef = coeficienteAnoMatricula
            resultIucAditional = aditionalTaxGasoleo
    
		} else if (firstRegistration.year >= currentYear - 1981) {
			if (["diesel", "hybrid-diesel", "hybrid-plugin-diesel"].includes(fuel.slug)) {
				if (firstRegistration >= DateTime.fromFormat('1996-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2007-06-01', 'yyyy-MM-dd').endOf('month')) {
					if (cm3 <= 1500) {
						taxCm3 = 19.34;
						aditionalTaxGasoleo = 3.14;
					} else if (cm3 <= 2000) {
						taxCm3 = 38.82;
						aditionalTaxGasoleo = 6.31;
					} else if (cm3 <= 3000) {
						taxCm3 = 60.64;
						aditionalTaxGasoleo = 9.86;
					} else {
						taxCm3 = 153.85;
						aditionalTaxGasoleo = 25.01;
					};
				} else if (firstRegistration >= DateTime.fromFormat('1990-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('1995-01-01', 'yyyy-MM-dd').endOf('year')) {
					if (cm3 <= 1500) {
						taxCm3 = 12.20;
						aditionalTaxGasoleo = 1.98;
                    } else if (cm3 <= 1500) {
						taxCm3 = 21.82;
						aditionalTaxGasoleo = 3.55;
					} else if (cm3 <= 3000) {
						taxCm3 = 33.89;
						aditionalTaxGasoleo = 5.51;
					} else {
						taxCm3 = 81.14;
						aditionalTaxGasoleo = 13.19;
					};
				} else if (firstRegistration >= DateTime.fromFormat('1981-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('1989-01-01', 'yyyy-MM-dd').endOf('year')) {
                    if (cm3 <= 1500) {
                        taxCm3 = 8.55;
						aditionalTaxGasoleo = 1.39;
					} else if (cm3 <= 2000) {
						taxCm3 = 12.20;
						aditionalTaxGasoleo = 1.98;
					} else if (cm3 <= 3000) {
						taxCm3 = 17.00;
						aditionalTaxGasoleo = 2.76;
					} else {
						taxCm3 = 35.07;
						aditionalTaxGasoleo = 5.70;
					};

				};
			} else if (!["diesel", "hybrid-diesel", "hybrid-plugin-diesel"].includes(fuel.slug)) {
				aditionalTaxGasoleo = 0;

				if (firstRegistration >= DateTime.fromFormat('1996-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('2007-06-01', 'yyyy-MM-dd').endOf('month')) {
					if (cm3 <= 1000) {
						taxCm3 = 19.34;
					} else if (cm3 <= 1300) {
						taxCm3 = 38.82;
					} else if (cm3 <= 1750) {
						taxCm3 = 60.64;
					} else if (cm3 <= 2600) {
						taxCm3 = 153.85;
					} else if (cm3 <= 3500) {
						taxCm3 = 279.39;
					} else {
						taxCm3 = 497.79;
					};
				} else if (firstRegistration >= DateTime.fromFormat('1990-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('1995-01-01', 'yyyy-MM-dd').endOf('year')) {
					if (cm3 <= 1000) {
						taxCm3 = 12.20;
					} else if (cm3 <= 1300) {
						taxCm3 = 21.82;
					} else if (cm3 <= 1750) {
						taxCm3 = 33.89;
					} else if (cm3 <= 2600) {
						taxCm3 = 81.14;
					} else if (cm3 <= 3500) {
						taxCm3 = 152.13;
					} else  {
						taxCm3 = 255.69;
					};
				} else if (firstRegistration >= DateTime.fromFormat('1981-01-01', 'yyyy-MM-dd') && firstRegistration <= DateTime.fromFormat('1989-01-01', 'yyyy-MM-dd').endOf('year')) {
                    if (cm3 <= 1000) {
						taxCm3 = 8.55;
                    } else if (cm3 <= 1300) {
						taxCm3 = 12.20;
                    } else if (cm3 <= 1750) {
						taxCm3 = 17.00;
                    } else if (cm3 <= 2600) {
						taxCm3 = 35.07;
                    } else if (cm3 <= 3500) {
						taxCm3 = 77.47;
					} else {
						taxCm3 = 117.49;
					};
				};
			} 
			
			if (!["diesel", "hybrid-diesel", "hybrid-plugin-diesel"].includes(fuel.slug)) {
				aditionalTaxGasoleo = 0
			}

            resultIucCm3 = taxCm3
            resultIucAditional = aditionalTaxGasoleo
            resultIuc = (taxCm3 + aditionalTaxGasoleo) < 10 ? 0 : (taxCm3 + aditionalTaxGasoleo)
		} else {
            throw new Exception("A data de primeiro registro não pode ser menor do que 1981")
        }

        return {
            total: resultIuc, 
            iuc: resultIuc, 
			iucCm3Component: resultIucCm3, 
			iucCo2Component: resultIucCo2, 
			iucAdditionalCo2: resultIucAdditionalCo2, 
			iucCoef: resultIucCoef, 
			iucAdditional: resultIucAditional
        }
	}
}