interface Calculate { 
    cm3: number, 
    co2: number, 
    isGasoleo: boolean, 
    carValue: number, 
    isEmissoesWLTP: boolean, 
    isHybrid: boolean, 
    isHybridPlugin: boolean, 
    addExpenses: boolean,
    age: number
}

export class ISV {

    private discountAge = [
        { age: 6, discount: .1 },
        { age: 12, discount: .1 },
        { age: 2 * 12, discount: .2 },
        { age: 3 * 12, discount: .28 },
        { age: 4 * 12, discount: .35 },
        { age: 5 * 12, discount: .43 },
        { age: 6 * 12, discount: .52 },
        { age: 7 * 12, discount: .6 },
        { age: 8 * 12, discount: .65 },
        { age: 9 * 12, discount: .7 },
        { age: 10 * 12, discount: .75 },
        { age: 11 * 12, discount: .8 },
        { age: 12 * 12, discount: .8 },
        { age: 13 * 12, discount: .8 },
        { age: 14 * 12, discount: .8 },
        { age: 15 * 12, discount: .8 },
        { age: null, discount: .8 },
    ]
    
    private discountCo2 = [
        { age: 6, discount: .1 },
        { age: 12, discount: .1 },
        { age: 2 * 12, discount: .1 },
        { age: 3 * 12, discount: .2 },
        { age: 4 * 12, discount: .2 },
        { age: 5 * 12, discount: .28 },
        { age: 6 * 12, discount: .28 },
        { age: 7 * 12, discount: .35 },
        { age: 8 * 12, discount: .43 },
        { age: 9 * 12, discount: .43 },
        { age: 10 * 12, discount: .52 },
        { age: 11 * 12, discount: .6 },
        { age: 12 * 12, discount: .6 },
        { age: 13 * 12, discount: .65 },
        { age: 14 * 12, discount: .7 },
        { age: 15 * 12, discount: .75 },
        { age: null, discount: .8 },
    ]
    

    static wltp(isGasoleo: boolean, isvCo2: number) {
        if (isGasoleo) {
            if (isvCo2 <= 79) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.24));
            } else if (isvCo2 <= 95) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.23));
            } else if (isvCo2 <= 120) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.22));
            } else if (isvCo2 <= 140) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.20));
            } else if (isvCo2 <= 160) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.17));
            } else if (isvCo2 > 160) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.05));
            };
        } else {
            if (isvCo2 <= 99) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.24));
            } else if (isvCo2 <= 115) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.23));
            } else if (isvCo2 <= 145) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.22));
            } else if (isvCo2 <= 175) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.20));
            } else if (isvCo2 <= 195) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.17));
            } else if (isvCo2 > 195) {
                isvCo2 = Math.round(isvCo2 - (isvCo2 * 0.05));
            };
        };

        return isvCo2;
    }

    /**
     * Calculate the ISV
     * @param inputCm3 
     * @param inputCo2 
     * @param isGasoleo 
     * @param carValue 
     * @param isEmissoesWLTP 
     * @param isHybrid 
     * @param isHybridPlugin 
     * @param addExpenses 
     * @returns 
     */
    static calculate ({
        cm3, co2, isGasoleo, carValue, isEmissoesWLTP, isHybrid, isHybridPlugin, addExpenses, age
    }: Calculate)
    {   
        // Valor das taxas
        const taxValue = carValue * .1;

        const hybridNormalBenefit = 0.6;
		const hybridPluginBenefit = 0.25;
        const hybridBenefic = 1;

        co2 = this.wltp(isGasoleo, co2);

        let [cm3Year, cm3NextYear] = [0, 0];

        // cm3NextYear = cm3NextYear

        // vamos calcular a componente cilindrada que é comum ao NEDC e WLTP
        // coloco a operação lógica porque há pessoas que não preenchem a cilindrada e eu não quero apresentar simulações sem esse dado
        // o 100 é escolhido por ser um mínimo de 3 algarismos, ao mesmo tempo que preenche o campo, aparece o campo seguinte do CO2
        // tenho que definir dois anos para poder fazer as comparações entre orçamentos de estado
        if (cm3 > 100) {
			if (cm3 <= 1000) {
				cm3Year = (cm3 * 1.00) - 777.50;
				cm3NextYear = (cm3 * 1.04) - 808.60;
			} else if (cm3 <= 1250) {
				cm3Year = (cm3 * 1.08) - 779.02;
				cm3NextYear = (cm3 * 1.12) - 810.18;
			} else if (cm3 > 1250) {
				cm3Year = (cm3 * 5.13) - 5672.97
				cm3NextYear = (cm3 * 5.34) - 5899.89
			};
		}

        // Se for novo
        if (age === 0) {
            var ValorISVcm3Novo_EsteAno = cm3Year;
            var ValorISVcm3Novo_ProximoAno = cm3NextYear;
        } else {
            var ValorISVcm3Ate6Meses_EsteAno = cm3Year - (cm3Year * DescontoIdadeAte6Meses);
            var ValorISVcm3Ate6Meses_ProximoAno = cm3NextYear - (cm3NextYear * DescontoIdadeAte6Meses);
            var ValorISVTotalAte6Meses_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeAte6Meses);

        }


        return {
            cm3
        }

    };
}