import { Exception } from "@adonisjs/core/build/standalone";
import Fuel from "App/Models/Fuel";
import { DateTime } from "luxon";

export class ISV {

	static calculateCo2AgeDiscount(age: number) {
		if (age <= 12*2) {
			return 0.10;
		} else if (age <= 12*4) {
			return 0.20;
		} else if (age < 12*6) {
			return 0.28;
		} else if (age <= 12*7) {
			return 0.35;
		} else if (age <= 12*9) {
			return 0.43;
		} else if (age <= 12*10) {
			return 0.52;
		} else if (age <= 12*12) {
			return 0.60;
		} else if (age <= 12*13) {
			return 0.65;
		} else if (age <= 12*14) {
			return 0.70;
		} else if (age <= 12*15) {
			return 0.75;
		} else {
			return 0.80;
		}
	}

	static calculateCm3AgeDiscount(age: number) {
		if (age <= 12 * 1) {
			return 0.1;
		} else if (age <= 12 * 2) {
			return 0.2;
		} else if (age <= 12*3) {
			return 0.28;
		} else if (age <= 12*4) {
			return 0.35;
		} else if (age <= 12*5) {
			return 0.43;
		} else if (age <= 12*6) {
			return 0.52;
		} else if (age <= 12 * 7) {
			return 0.6;
		} else if (age <= 12 * 8) {
			return 0.65;
		} else if (age <= 12*9) {
			return 0.7;
		} else if (age <= 12*10) {
			return 0.75;
		} else {
			return 0.8;
		}
	}

	static applyCo2Reduction(co2: number, wltp: boolean, fuel: Fuel) {
		if (!wltp) {
			return co2;
		}
		if (fuel.slug === "diesel") {
			if (co2 <= 79) {
				co2 = Math.round(co2 - (co2 * 0.24));
			} else if (co2 <= 95) {
				co2 = Math.round(co2 - (co2 * 0.23));
			} else if (co2 <= 120) {
				co2 = Math.round(co2 - (co2 * 0.22));
			} else if (co2 <= 140) {
				co2 = Math.round(co2 - (co2 * 0.20));
			} else if (co2 <= 160) {
				co2 = Math.round(co2 - (co2 * 0.17));
			} else if (co2 > 160) {
				co2 = Math.round(co2 - (co2 * 0.05));
			};
		} else {
			if (co2 <= 99) {
				co2 = Math.round(co2 - (co2 * 0.24));
			} else if (co2 <= 115) {
				co2 = Math.round(co2 - (co2 * 0.23));
			} else if (co2 <= 145) {
				co2 = Math.round(co2 - (co2 * 0.22));
			} else if (co2 <= 175) {
				co2 = Math.round(co2 - (co2 * 0.20));
			} else if (co2 <= 195) {
				co2 = Math.round(co2 - (co2 * 0.17));
			} else if (co2 > 195) {
				co2 = Math.round(co2 - (co2 * 0.05));
			};
		};

		return co2
	}

	static calculateCm3Tax(cm3: number, calculationYear: number) {
		const taxes = [
			{ year: 2023, cm3: 1000, calc: (cm3) => (cm3 * 1.00) - 777.50, },
			{ year: 2023, cm3: 1250, calc: (cm3) => (cm3 * 1.08) - 779.02, },
			{ year: 2023, cm3: Infinity, calc: (cm3) => (cm3 * 5.13) - 5672.97, },


			{ year: 2024, cm3: 1000, calc: (cm3) => (cm3 * 1.09) - 849.03, },
			{ year: 2024, cm3: 1250, calc: (cm3) => (cm3 * 1.18) - 850.69, },
			{ year: 2024, cm3: Infinity, calc: (cm3) => (cm3 * 5.61) - 6194.88, },
		]

		const tax = taxes.find(tax => tax.year === calculationYear && cm3 <= tax.cm3)
		if (!tax) {
			throw new Exception("Não foi possível calcular a taxa de cm3")
		}
		return tax.calc(cm3)
	}

	static applyFuelDiscount(cm3Total: number, fuel: Fuel) {
		let benefit = 1
		if (["hybrid-gasoline", "hybrid-diesel"].includes(fuel.slug)) {
			benefit = 0.6;
		} else if (["hybrid-plugin-gasoline", "hybrid-plugin-diesel"].includes(fuel.slug)) {
			benefit = 0.25;
		};	
		return cm3Total * benefit;
	}

	static calculateCO2(co2: number, fuel: Fuel, calculationYear: number, wltp: boolean) {
		// cálculo do CO2 em , com os escalões de  que são diferentes dos de 2020 por causa do WLTP
		const coefficientRanges = [
			{ year: 2023, min: 0, max: 79, diesel: { a: 5.50, b: 418.13 }, gasoline: { a: 4.40, b: 406.67 }, dieselWLTP: { a: 1.64, b: 10.95 }, gasolineWLTP: { a: 0.42, b: 40.97 } },
			{ year: 2023, min: 80, max: 95, diesel: { a: 22.33, b: 1760.55 }, gasoline: { a: 4.40, b: 406.67 }, dieselWLTP: { a: 1.64, b: 10.95 }, gasolineWLTP: { a: 0.42, b: 40.97 } },
			{ year: 2023, min: 96, max: 99, diesel: { a: 75.45, b: 6852.98 }, gasoline: { a: 4.40, b: 406.67 }, dieselWLTP: { a: 1.64, b: 10.95 }, gasolineWLTP: { a: 0.42, b: 40.97 } },
			{ year: 2023, min: 100, max: 110, diesel: { a: 75.45, b: 6852.98 }, gasoline: { a: 7.70, b: 715.23 }, dieselWLTP: { a: 1.64, b: 10.95 }, gasolineWLTP: { a: 0.42, b: 40.97 } },
			{ year: 2023, min: 111, max: 115, diesel: { a: 75.45, b: 6852.98 }, gasoline: { a: 7.70, b: 715.23 }, dieselWLTP: { a: 18.06, b: 1815.42 }, gasolineWLTP: { a: 1.05, b: 110.29 } },
			{ year: 2023, min: 116, max: 120, diesel: { a: 75.45, b: 6852.98 }, gasoline: { a: 50.06, b: 5622.80 }, dieselWLTP: { a: 18.06, b: 1815.42 }, gasolineWLTP: { a: 1.31, b: 140.75 } },
			{ year: 2023, min: 121, max: 130, diesel: { a: 167.36, b: 18023.73 }, gasoline: { a: 50.06, b: 5622.80 }, dieselWLTP: { a: 61.94, b: 7010.33 }, gasolineWLTP: { a: 5.02, b: 589.69 } },
			{ year: 2023, min: 131, max: 140, diesel: { a: 167.36, b: 18023.73 }, gasoline: { a: 50.06, b: 5622.80 }, dieselWLTP: { a: 61.94, b: 7010.33 }, gasolineWLTP: { a: 6.08, b: 726.41 } },
			{ year: 2023, min: 141, max: 145, diesel: { a: 186.12, b: 20686.59 }, gasoline: { a: 50.06, b: 5622.80 }, dieselWLTP: { a: 121.33, b: 15314.83 }, gasolineWLTP: { a: 6.08, b: 726.41 } },
			{ year: 2023, min: 146, max: 150, diesel: { a: 186.12, b: 20686.59 }, gasoline: { a: 58.32, b: 6800.16 }, dieselWLTP: { a: 121.33, b: 15314.83 }, gasolineWLTP: { a: 39.56, b: 5542.44 } },
			{ year: 2023, min: 151, max: 160, diesel: { a: 186.12, b: 20686.59 }, gasoline: { a: 58.32, b: 6800.16 }, dieselWLTP: { a: 153.15, b: 20167.68 }, gasolineWLTP: { a: 39.56, b: 5542.44 } },
			{ year: 2023, min: 161, max: 170, diesel: { a: 255.64, b: 31855.14 }, gasoline: { a: 58.32, b: 6800.16 }, dieselWLTP: { a: 211.13, b: 27835.60 }, gasolineWLTP: { a: 39.56, b: 5542.44 } },
			{ year: 2023, min: 171, max: 175, diesel: { a: 255.64, b: 31855.14 }, gasoline: { a: 58.32, b: 6800.16 }, dieselWLTP: { a: 261.03, b: 35226.65 }, gasolineWLTP: { a: 39.56, b: 5542.44 } },
			{ year: 2023, min: 176, max: 190, diesel: { a: 255.64, b: 31855.14 }, gasoline: { a: 148.54, b: 22502.16 }, dieselWLTP: { a: 261.03, b: 35226.65 }, gasolineWLTP: { a: 48.93, b: 6902.28 } },
			{ year: 2023, min: 191, max: 195, diesel: { a: 255.64, b: 31855.14 }, gasoline: { a: 148.54, b: 22502.16 }, dieselWLTP: { a: 268.90, b: 36448.88 }, gasolineWLTP: { a: 48.93, b: 6902.28 } },
			{ year: 2023, min: 196, max: Infinity, diesel: { a: 255.64, b: 31855.14 }, gasoline: { a: 195.86, b: 31800.11 }, dieselWLTP: { a: 268.90, b: 36448.88 }, gasolineWLTP: { a: 183.82, b: 32562.40 } },
		  
			{ year: 2024, min: 0, max: 79, diesel: { a: 5.78, b: 439.04 }, gasoline: { a: 4.62, b: 427 }, dieselWLTP: { a: 1.72, b: 11.50 }, gasolineWLTP: { a: 0.44, b: 43.02 } },
			{ year: 2024, min: 80, max: 95, diesel: { a: 23.45, b: 1848.58 }, gasoline: { a: 4.62, b: 427 }, dieselWLTP: { a: 1.72, b: 11.50 }, gasolineWLTP: { a: 0.44, b: 43.02 } },
			{ year: 2024, min: 96, max: 99, diesel: { a: 79.22, b: 7195.63 }, gasoline: { a: 4.62, b: 427 }, dieselWLTP: { a: 1.72, b: 11.50 }, gasolineWLTP: { a: 0.44, b: 43.02 } },
			{ year: 2024, min: 100, max: 110, diesel: { a: 79.22, b: 7195.63 }, gasoline: { a: 8.09, b: 750.99 }, dieselWLTP: { a: 1.72, b: 11.50 }, gasolineWLTP: { a: 0.44, b: 43.02 } },
			{ year: 2024, min: 111, max: 115, diesel: { a: 79.22, b: 7195.63 }, gasoline: { a: 8.09, b: 750.99 }, dieselWLTP: { a: 18.96, b: 1906.19 }, gasolineWLTP: { a: 1.10, b: 115.80 } },
			{ year: 2024, min: 116, max: 120, diesel: { a: 79.22, b: 7195.63 }, gasoline: { a: 52.56, b: 5903.94 }, dieselWLTP: { a: 18.96, b: 1906.19 }, gasolineWLTP: { a: 1.38, b: 147.79 } },
			{ year: 2024, min: 121, max: 130, diesel: { a: 175.73, b: 18924.92 }, gasoline: { a: 52.56, b: 5903.94 }, dieselWLTP: { a: 65.04, b: 7360.85 }, gasolineWLTP: { a: 5.27, b: 619.17 } },
			{ year: 2024, min: 131, max: 140, diesel: { a: 175.73, b: 18924.92 }, gasoline: { a: 52.56, b: 5903.94 }, dieselWLTP: { a: 65.04, b: 7360.85 }, gasolineWLTP: { a: 6.38, b: 762.73 } },
			{ year: 2024, min: 141, max: 145, diesel: { a: 195.43, b: 21720.92 }, gasoline: { a: 52.56, b: 5903.94 }, dieselWLTP: { a: 127.40, b: 16080.57 }, gasolineWLTP: { a: 6.38, b: 762.73 } },
			{ year: 2024, min: 146, max: 150, diesel: { a: 195.43, b: 21720.92 }, gasoline: { a: 61.24, b: 7140.17 }, dieselWLTP: { a: 127.40, b: 16080.57 }, gasolineWLTP: { a: 41.54, b: 5819.56 } },
			{ year: 2024, min: 151, max: 160, diesel: { a: 195.43, b: 21720.92 }, gasoline: { a: 61.24, b: 7140.17 }, dieselWLTP: { a: 160.81, b: 21176.06 }, gasolineWLTP: { a: 41.54, b: 5819.56 } },
			{ year: 2024, min: 161, max: 170, diesel: { a: 268.42, b: 33447.90 }, gasoline: { a: 61.24, b: 7140.17 }, dieselWLTP: { a: 221.69, b: 29227.38 }, gasolineWLTP: { a: 41.54, b: 5819.56 } },
			{ year: 2024, min: 171, max: 175, diesel: { a: 268.42, b: 33447.90 }, gasoline: { a: 61.24, b: 7140.17 }, dieselWLTP: { a: 274.08, b: 36987.98 }, gasolineWLTP: { a: 41.54, b: 5819.56 } },
			{ year: 2024, min: 176, max: 190, diesel: { a: 268.42, b: 33447.90 }, gasoline: { a: 155.97, b: 23627.27 }, dieselWLTP: { a: 274.08, b: 36987.98 }, gasolineWLTP: { a: 51.38, b: 7247.39 } },
			{ year: 2024, min: 191, max: 195, diesel: { a: 268.42, b: 33447.90 }, gasoline: { a: 155.97, b: 23627.27 }, dieselWLTP: { a: 282.35, b: 38271.32 }, gasolineWLTP: { a: 51.38, b: 7247.39 } },
			{ year: 2024, min: 196, max: 235, diesel: { a: 268.42, b: 33447.90 }, gasoline: { a: 205.65, b: 33390.12 }, dieselWLTP: { a: 282.35, b: 38271.32 }, gasolineWLTP: { a: 193.01, b: 34190.52 } },
			{ year: 2024, min: 236, max: Infinity, diesel: { a: 268.42, b: 33447.90 }, gasoline: { a: 205.65, b: 33390.12 }, dieselWLTP: { a: 282.35, b: 38271.32 }, gasolineWLTP: { a: 233.81, b: 41910.96 } }

		  
		]
	
		const fuelName = (fuel.slug + (wltp ? 'WLTP' : ''))
			.replace('hybrid-', '')
			.replace('plugin-', '')
		let selectedRange = coefficientRanges.find(coefficent => co2 >= coefficent.min && co2 <= coefficent.max && calculationYear == coefficent.year);
		if (!selectedRange) {
			throw new Exception("Não foi possível encontrar o range de cálculo para componente de Co2")
		}
		console.log(selectedRange, fuelName)
		return (co2 * selectedRange[fuelName].a) - selectedRange[fuelName].b; 
	}

    /**
     * Calculate the ISV
     */
    static calculate ({
        cm3, co2, wltp, fuel, firstRegistration, isUE, calculationYear, carValue
    }: {
        cm3: number, co2: number, wltp: boolean, fuel: Fuel, firstRegistration: DateTime, isUE: boolean, calculationYear: number, carValue: number
    })
    {  
		let age = +DateTime.now().diff(firstRegistration).as('months').toFixed(2);
		console.log("Idade", age, age / 12)
		if (!isUE) {
			age = 0
		}
		let [co2Tax, cm3Tax] = [0,0]
		if (fuel.slug !== "eletric") {
			[co2Tax, cm3Tax] = this.calculateComponents(calculationYear, cm3, co2, isUE, fuel, age, wltp)
		}

		const isv = co2Tax + cm3Tax
		const taxes = +(isUE ? 0 : 0.1 * carValue).toFixed(2)
		const iva = isUE ? 0 : 0.23 * (carValue + isv + taxes)
		const total = +(isv + taxes + iva).toFixed(2)

		console.log("ISV", isv)
		return {
			total,
			isv,
			isvCo2Component: co2Tax,
			isvCm3Component: cm3Tax,
			taxes,
			iva
		}
	}
	static calculateComponents(calculationYear, cm3, co2, isUE, fuel, age, wltp): any {
		// Calcula componente cm3
		let cm3Tax = this.calculateCm3Tax(cm3, calculationYear)
		if (isUE) {
			cm3Tax = this.applyFuelDiscount(cm3Tax, fuel)
			cm3Tax = cm3Tax - (cm3Tax * this.calculateCm3AgeDiscount(age)) // Aplica desconto de idade	
		}
		console.log("cm3", cm3Tax)

	
		// Calculo do componente ambiental
		// co2 = this.applyCo2Reduction(co2, wltp, fuel)
		let co2Tax = this.calculateCO2(co2, fuel, calculationYear, wltp)
		if (isUE) {
			co2Tax = co2Tax - Math.abs(co2Tax * this.calculateCo2AgeDiscount(age)) // Aplica desconto de idade
			co2Tax = this.applyFuelDiscount(co2Tax, fuel);
		}
		console.log("co2", co2Tax)

		return [+co2Tax.toFixed(2), +(cm3Tax).toFixed(2)]
	}

};
