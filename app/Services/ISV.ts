export class ISV {
    /**
     * Calculate the ISV
     * @param inputCm3 
     * @param inputCo2 
     * @param isGasoleo 
     * @param carValue 
     * @param wltp 
     * @param isHybrid 
     * @param isHybridPlugin 
     * @param addExpenses 
     * @returns 
     */
    static calculate ({
        cm3, co2, isGasoleo, carValue, wltp, isHybrid, isHybridPlugin, addExpenses, age, isUE
    }: {
        cm3: number, co2: number, isGasoleo: boolean, carValue: number, wltp: boolean, isHybrid: boolean, isHybridPlugin: boolean, addExpenses: boolean, age: number, isUE: boolean
    })
    {   
		console.info({
			cm3, co2, isGasoleo, carValue, wltp, isHybrid, isHybridPlugin, addExpenses, age, isUE
		})
        // variável da cilindrada do ISV, será boa ideia criar duas variáveis, uma para cada imposto? é que a variável não muda, é sempre a mesma!
        var DadosISVcm3 = 0;
	    // variável do CO2
		var DadosISVCO2 = 0;

	    // variável do combustível para poder apresentar o feedback na simulação
		var DadosCombustivel = "";
	    // defino como 10% o valor das taxas aduaneiras - é o máximo possível
		var TaxasAduaneirasPercentagem = 0.1;
	    // o valor mínimo do ISV é sempre 100€, tenho que definir essa variável, assim como o valor do IVA para o caso dos novos e dos importados fora UE
		var ValorISVMinimo = 100;
		var ValorPercentagemIVA = 1.23;
		var ValorIVA = 0.23;
	    // preciso do valor do carro para apresentar resultados com o valor incluído, para apresentar um "PVP", para calcular o IVA e as taxas aduaneiras
		var ValorCarro = 0;
		var ValorTaxas = 0;
		var ValorDespesasImportacao = 0;
	    // defino as variáveis com os descontos da idade cilindrada
		var DescontoIdadeAte6Meses = 0.1;
		var DescontoIdadeMais6Mesesa = 0.1;
		var DescontoIdadeMais1a2Anos = 0.2;
		var DescontoIdadeMais2a3Anos = 0.28;
		var DescontoIdadeMais3a4Anos = 0.35;
		var DescontoIdadeMais4a5Anos = 0.43;
		var DescontoIdadeMais5a6Anos = 0.52;
		var DescontoIdadeMais6a7Anos = 0.6;
		var DescontoIdadeMais7a8Anos = 0.65;
		var DescontoIdadeMais8a9Anos = 0.7;
		var DescontoIdadeMais9a10Anos = 0.75;
		var DescontoIdadeMais10a1s = 0.8;
		var DescontoIdadeMais11a12Anos = 0.8;
		var DescontoIdadeMais12a13Anos = 0.8;
		var DescontoIdadeMais13a14Anos = 0.8;
		var DescontoIdadeMais14a15Anos = 0.8;
		var DescontoIdadeMais15Anos = 0.8;

	    // defino as variáveis com os descontos da idade CO2
		var DescontoCO2IdadeAte6Meses = 0.10;
		var DescontoCO2IdadeMais6Mesesa = 0.10;
		var DescontoCO2IdadeMais1a2Anos = 0.10;
		var DescontoCO2IdadeMais2a3Anos = 0.20;
		var DescontoCO2IdadeMais3a4Anos = 0.20;
		var DescontoCO2IdadeMais4a5Anos = 0.28;
		var DescontoCO2IdadeMais5a6Anos = 0.28;
		var DescontoCO2IdadeMais6a7Anos = 0.35;
		var DescontoCO2IdadeMais7a8Anos = 0.43;
		var DescontoCO2IdadeMais8a9Anos = 0.43;
		var DescontoCO2IdadeMais9a10Anos = 0.52;
		var DescontoCO2IdadeMais10a1s = 0.60;
		var DescontoCO2IdadeMais11a12Anos = 0.60;
		var DescontoCO2IdadeMais12a13Anos = 0.65;
		var DescontoCO2IdadeMais13a14Anos = 0.70;
		var DescontoCO2IdadeMais14a15Anos = 0.75;
		var DescontoCO2IdadeMais15Anos = 0.8;
	    // os benefícios fiscais são dados como x% do valor do ISV, aqui indico as variáveis dos benefícios que não passam de percentagens, daí terem que ser todas 1 inicialmente
		var BeneficioHibridoNormalPercentagem = 0.6;
		var BeneficioHibridoPlugInPercentagem = 0.25;
		var BeneficioHibrido = 1;
	    // os valores em € das duas componentes
		var ValorISVcm3_EsteAno = 0;
		var ValorISVcm3_ProximoAno = 0;
		var ValorISVCO2_EsteAno = 0;
		var ValorISVCO2_ProximoAno = 0;
		var ValorISVTotal_ProximoAno = ValorISVcm3_ProximoAno + ValorISVCO2_ProximoAno;
		
        // Vou buscar os dados aos campos se estiverem preenchidos e atribuo-os às variáveis

	    // vou buscar a cilindrada ao campo
		if (cm3 > 0) {
			var DadosISVcm3 = (+Number(cm3));
		};
	    // se a cilindrada foi escolhida da dropdown box vou lá buscar o valor
		if (cm3 > 1) {
			var DadosISVcm3 = (+Number(cm3));
		};
	    // agora vou buscar o CO2 ao campo
		var DadosISVCO2 = (+Number(co2));
		var DadosISVCO2_ProximoAno = (+Number(co2));
	    // vejo qual foi o combustível escolhido para definir uma variável para depois dar feedback ao utilizador do combustível que está activo para a simulação
		if (isGasoleo) {
			var DadosCombustivel = "Gasoleo";
		} else {
			var DadosCombustivel = "Gasolina";
		};
	    // vou buscar o valor do carro ao campo para apresentar a simulação com o valor do carro incluído, para calcular o valor das taxas aduaneiras a 10% e coloco/retiro os avisos para as importações fora UE
		if (+Number(carValue) > 0) {
			var ValorCarro = +Number(carValue);
			var ValorTaxas = ValorCarro * TaxasAduaneirasPercentagem;
		} 

        // Cálculos preliminares

        // aplicar a tabela de reduções de CO2 WLTP em 
        // conforme o escalão do CO2, atribuo uma percentagem de redução 
        // em 2020 há tabelas exclusivas para WLTP daí que só vou usar estes dados para a simulação de 
		if (wltp) {
			if (isGasoleo) {
				if (DadosISVCO2 <= 79) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.24));
				} else if (DadosISVCO2 <= 95) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.23));
				} else if (DadosISVCO2 <= 120) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.22));
				} else if (DadosISVCO2 <= 140) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.20));
				} else if (DadosISVCO2 <= 160) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.17));
				} else if (DadosISVCO2 > 160) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.05));
				};
			} else {
				if (DadosISVCO2 <= 99) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.24));
				} else if (DadosISVCO2 <= 115) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.23));
				} else if (DadosISVCO2 <= 145) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.22));
				} else if (DadosISVCO2 <= 175) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.20));
				} else if (DadosISVCO2 <= 195) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.17));
				} else if (DadosISVCO2 > 195) {
					DadosISVCO2 = Math.round(DadosISVCO2 - (DadosISVCO2 * 0.05));
				};
			};
		};
	// desconto dado aos híbridos
		if (isHybrid) {
			BeneficioHibrido = BeneficioHibridoNormalPercentagem;
		};
		if (isHybridPlugin) {
			BeneficioHibrido = BeneficioHibridoPlugInPercentagem;
		};	
	// se a checkbox das despesas estiver activa adiciono esse valor à variável mas a variável fica já com valor zero
		if (addExpenses == true) {
			var ValorDespesasImportacao = 1250;
		};
	// vamos calcular a componente cilindrada que é comum ao NEDC e WLTP, coloco a operação lógica porque há pessoas que não preenchem a cilindrada e eu não quero apresentar simulações sem esse dado, o 100 é escolhido por ser um mínimo de 3 algarismos, ao mesmo tempo que preenche o campo, aparece o campo seguinte do CO2, tenho que definir dois anos para poder fazer as comparações entre orçamentos de estado
		if (DadosISVcm3 > 100) {
			if (DadosISVcm3 <= 1000) {
				ValorISVcm3_EsteAno = (DadosISVcm3 * 1.00) - 777.50;
				ValorISVcm3_ProximoAno = (DadosISVcm3 * 1.04) - 808.60;
			} else if (DadosISVcm3 <= 1250) {
				ValorISVcm3_EsteAno = (DadosISVcm3 * 1.08) - 779.02;
				ValorISVcm3_ProximoAno = (DadosISVcm3 * 1.12) - 810.18;
			} else if (DadosISVcm3 > 1250) {
				ValorISVcm3_EsteAno = (DadosISVcm3 * 5.13) - 5672.97
				ValorISVcm3_ProximoAno = (DadosISVcm3 * 5.34) - 5899.89
			};
		}
	// aplico o desconto dos hibridos à componente cilindrada, será boa ideia aplicar este desconto só no fim em vez de o aplicar duas vezes às componentes? Se calhar sim, porque se isto muda para se aplicar o desconto a uma só componente em vez de à totalidade, fico pendurado
		var ValorISVcm3_EsteAno = ValorISVcm3_EsteAno * BeneficioHibrido;
		var ValorISVcm3_ProximoAno = ValorISVcm3_ProximoAno * BeneficioHibrido;
	// vamos calcular a componente cilindrada com os descontos da idade
		// novo
		var ValorISVcm3Novo_EsteAno = ValorISVcm3_EsteAno;
		var ValorISVcm3Novo_ProximoAno = ValorISVcm3_ProximoAno;
		// até 6 meses
		var ValorISVcm3Ate6Meses_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeAte6Meses);
		var ValorISVcm3Ate6Meses_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeAte6Meses);
		// 6 meses a 1 ano
		var ValorISVcm3Mais6Mesesa_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais6Mesesa);
		var ValorISVcm3Mais6Mesesa_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais6Mesesa);
		// 1 a 2 anos
		var ValorISVcm3Mais1a2Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais1a2Anos);
		var ValorISVcm3Mais1a2Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais1a2Anos);
		// 2 a 3 anos
		var ValorISVcm3Mais2a3Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais2a3Anos);
		var ValorISVcm3Mais2a3Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais2a3Anos);
		// 3 a 4 anos
		var ValorISVcm3Mais3a4Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais3a4Anos);
		var ValorISVcm3Mais3a4Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais3a4Anos);
		// 4 a 5 anos
		var ValorISVcm3Mais4a5Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais4a5Anos);
		var ValorISVcm3Mais4a5Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais4a5Anos);
		// 5 a 6 anos
		var ValorISVcm3Mais5a6Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais5a6Anos);
		var ValorISVcm3Mais5a6Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais5a6Anos);
		// 6 a 7 anos
		var ValorISVcm3Mais6a7Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais6a7Anos);
		var ValorISVcm3Mais6a7Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais6a7Anos);
		// 7 a 8 anos
		var ValorISVcm3Mais7a8Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais7a8Anos);
		var ValorISVcm3Mais7a8Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais7a8Anos);
		// 8 a 9 anos
		var ValorISVcm3Mais8a9Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais8a9Anos);
		var ValorISVcm3Mais8a9Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais8a9Anos);
		// 9 a 10 anos
		var ValorISVcm3Mais9a10Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais9a10Anos);
		var ValorISVcm3Mais9a10Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais9a10Anos);

		// 10 a 11 anos
		var ValorISVcm3Mais10a1s_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais10a1s);
		var ValorISVcm3Mais10a1s_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais10a1s);
		// 11 a 12 anos
		var ValorISVcm3Mais11a12Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais11a12Anos);
		var ValorISVcm3Mais11a12Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais11a12Anos);
		// 12 a 13 anos
		var ValorISVcm3Mais12a13Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais12a13Anos);
		var ValorISVcm3Mais12a13Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais12a13Anos);
		// 13 a 14 anos
		var ValorISVcm3Mais13a14Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais13a14Anos);
		var ValorISVcm3Mais13a14Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais13a14Anos);
		// 14 a 15 anos
		var ValorISVcm3Mais14a15Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais14a15Anos);
		var ValorISVcm3Mais14a15Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais14a15Anos);
		// mais de 15 anos
		var ValorISVcm3Mais15Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais15Anos);
		var ValorISVcm3Mais15Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais15Anos);

	// definir as variáveis do valor do CO2
		var ValorISVCO2Gasoleo_EsteAno = 0;
		var ValorISVCO2Gasoleo_ProximoAno = 0;
		var ValorISVCO2Gasolina_EsteAno = 0;
		var ValorISVCO2Gasolina_ProximoAno = 0;
		var ValorISVCO2GasoleoWLTP_EsteAno = 0;
		var ValorISVCO2GasolinaWLTP_EsteAno = 0;
		var ValorISVCO2GasoleoWLTP_ProximoAno = 0;
		var ValorISVCO2GasolinaWLTP_ProximoAno = 0;
	// vou calcular o valor da componente ambiental, o CO2
		if (DadosISVCO2 > 0) {
			// cálculo do CO2 em , com os escalões de  que são diferentes dos de 2020 por causa do WLTP
			if (DadosISVCO2 <= 79) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 5.24) - 398.07;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 4.23) - 391.03;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 1.56) - 10.43;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 0.42) - 39;
			} else if (DadosISVCO2 >= 80 && DadosISVCO2 <= 95) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 21.26) - 1676.08;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 4.19) - 387.16;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 1.56) - 10.43;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 0.42) - 39;
			} else if (DadosISVCO2 >= 96 && DadosISVCO2 <= 99) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 71.83) - 6524.16;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 4.19) - 387.16;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 1.56) - 10.43;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 0.42) - 39;
			} else if (DadosISVCO2 >= 100 && DadosISVCO2 <= 110) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 71.83) - 6524.16;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 7.33) - 680.91;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 1.56) - 10.43;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 0.42) - 39;
			} else if (DadosISVCO2 >= 111 && DadosISVCO2 <= 115) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 71.83) - 6524.16;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 7.33) - 680.91;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 17.2) - 1728.32;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 1) - 105;
			} else if (DadosISVCO2 >= 116 && DadosISVCO2 <= 120) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 71.83) - 6524.16;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 47.65) - 5353.01;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 17.2) - 1728.32;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 1.25) - 134;
			} else if (DadosISVCO2 >= 121 && DadosISVCO2 <= 130) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 159.33) - 17158.92;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 47.65) - 5353.01;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 58.97) - 6673.96;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 4.78) - 561.4;
			} else if (DadosISVCO2 >= 131 && DadosISVCO2 <= 140) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 159.33) - 17158.92;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 47.65) - 5353.01;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 58.97) - 6673.96;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 5.79) - 691.55;
			} else if (DadosISVCO2 >= 141 && DadosISVCO2 <= 145) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 177.19) - 19694.01;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 47.65) - 5353.01;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 115.50) - 14580;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 5.79) - 691.55;
			} else if (DadosISVCO2 >= 146 && DadosISVCO2 <= 150) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 177.19) - 19694.01;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 55.52) - 6473.88;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 115.5) - 14580;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 37.66) - 5276.5;
			} else if (DadosISVCO2 >= 151 && DadosISVCO2 <= 160) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 177.19) - 19694.01;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 55.52) - 6473.88;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 145.8) - 19200;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 37.66) - 5276.5;
			} else if (DadosISVCO2 >= 161 && DadosISVCO2 <= 170) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 243.38) - 30326.67;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 55.52) - 6473.88;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 201) - 26500;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 37.66) - 5276.5;
			} else if (DadosISVCO2 >= 171 && DadosISVCO2 <= 175) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 243.38) - 30326.67;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 55.52) - 6473.88;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 248.5) - 33536.42;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 37.66) - 5276.5;
			} else if (DadosISVCO2 >= 176 && DadosISVCO2 <= 190) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 243.38) - 30326.67;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 141.42) - 21422.47;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 248.5) - 33536.42;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 46.58) - 6571.1;
			} else if (DadosISVCO2 >= 191 && DadosISVCO2 <= 195) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 243.38) - 30326.67;
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 141.42) - 21422.47;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 256) - 34700;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 46.58) - 6571.1;
			} else if (DadosISVCO2 >= 196 && DadosISVCO2 <= 235) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 243.38) - 30326.67;				
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 186.47) - 30274.29;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 256) - 34700;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 175) - 31000;
			} else if (DadosISVCO2 >= 236) {
				ValorISVCO2Gasoleo_EsteAno = (DadosISVCO2 * 243.38) - 30326.67;				
				ValorISVCO2Gasolina_EsteAno = (DadosISVCO2 * 186.47) - 30274.29;
				ValorISVCO2GasoleoWLTP_EsteAno = (DadosISVCO2 * 256) - 34700;
				ValorISVCO2GasolinaWLTP_EsteAno = (DadosISVCO2 * 212) - 38000;
			};
			if (DadosISVCO2_ProximoAno <= 79) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 5.50) - 418.13;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 4.40) - 406.67;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 1.64) - 10.95;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 0.42) - 40.97;
			} else if (DadosISVCO2_ProximoAno >= 80 && DadosISVCO2_ProximoAno <= 95) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 22.33) - 1760.55;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 4.40) - 406.67;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 1.64) - 10.95;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 0.42) - 40.97;
			} else if (DadosISVCO2_ProximoAno >= 96 && DadosISVCO2_ProximoAno <= 99) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 75.45) - 6852.98;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 4.40) - 406.67;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 1.64) - 10.95;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 0.42) - 40.97;
			} else if (DadosISVCO2_ProximoAno >= 100 && DadosISVCO2_ProximoAno <= 110) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 75.45) - 6852.98;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 7.70) - 715.23;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 1.64) - 10.95;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 0.42) - 40.97;
			} else if (DadosISVCO2_ProximoAno >= 111 && DadosISVCO2_ProximoAno <= 115) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 75.45) - 6852.98;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 7.70) - 715.23;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 18.06) - 1815.42;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 1.05) - 110.29;
			} else if (DadosISVCO2_ProximoAno >= 116 && DadosISVCO2_ProximoAno <= 120) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 75.45) - 6852.98;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 50.06) - 5622.80;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 18.06) - 1815.42;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 1.31) - 140.75;
			} else if (DadosISVCO2_ProximoAno >= 121 && DadosISVCO2_ProximoAno <= 130) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 167.36) - 18023.73;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 50.06) - 5622.80;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 61.94) - 7010.33;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 5.02) - 589.69;
			} else if (DadosISVCO2_ProximoAno >= 131 && DadosISVCO2_ProximoAno <= 140) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 167.36) - 18023.73;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 50.06) - 5622.80;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 61.94) - 7010.33;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 6.08) - 726.41;
			} else if (DadosISVCO2_ProximoAno >= 141 && DadosISVCO2_ProximoAno <= 145) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 186.12) - 20686.59;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 50.06) - 5622.80;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 121.33) - 15314.83;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 6.08) - 726.41;
			} else if (DadosISVCO2_ProximoAno >= 146 && DadosISVCO2_ProximoAno <= 150) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 186.12) - 20686.59;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 58.32) - 6800.16;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 121.33) - 15314.83;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 39.56) - 5542.44;
			} else if (DadosISVCO2_ProximoAno >= 151 && DadosISVCO2_ProximoAno <= 160) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 186.12) - 20686.59;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 58.32) - 6800.16;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 153.15) - 20167.68;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 39.56) - 5542.44;
			} else if (DadosISVCO2_ProximoAno >= 161 && DadosISVCO2_ProximoAno <= 170) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 255.64) - 31855.14;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 58.32) - 6800.16;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 211.13) - 27835.60;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 39.56) - 5542.44;
			} else if (DadosISVCO2_ProximoAno >= 171 && DadosISVCO2_ProximoAno <= 175) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 255.64) - 31855.14;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 58.32) - 6800.16;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 261.03) - 35226.65;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 39.56) - 5542.44;
			} else if (DadosISVCO2_ProximoAno >= 176 && DadosISVCO2_ProximoAno <= 190) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 255.64) - 31855.14;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 148.54) - 22502.16;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 261.03) - 35226.65;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 48.93) - 6902.28;
			} else if (DadosISVCO2_ProximoAno >= 191 && DadosISVCO2_ProximoAno <= 195) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 255.64) - 31855.14;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 148.54) - 22502.16;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 268.90) - 36448.88;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 48.93) - 6902.28;
			} else if (DadosISVCO2_ProximoAno >= 196 && DadosISVCO2_ProximoAno <= 235) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 255.64) - 31855.14;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 195.86) - 31800.11;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 268.90) - 36448.88;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 183.82) - 32562.40;
			} else if (DadosISVCO2_ProximoAno >= 236) {
				ValorISVCO2Gasoleo_ProximoAno = (DadosISVCO2_ProximoAno * 255.64) - 31855.14;
				ValorISVCO2Gasolina_ProximoAno = (DadosISVCO2_ProximoAno * 195.86) - 31800.11;
				ValorISVCO2GasoleoWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 268.90) - 36448.88;
				ValorISVCO2GasolinaWLTP_ProximoAno = (DadosISVCO2_ProximoAno * 222.68) - 39915.20;
			};
		}

		// agora separamos o combustível para apresentar o resultado
		if (DadosCombustivel == "Gasoleo") {
			if (wltp) {
				ValorISVCO2_EsteAno = ValorISVCO2Gasoleo_EsteAno;
				ValorISVCO2_ProximoAno = ValorISVCO2GasoleoWLTP_ProximoAno;
			} else {
				ValorISVCO2_EsteAno = ValorISVCO2Gasoleo_EsteAno;
				ValorISVCO2_ProximoAno = ValorISVCO2Gasoleo_ProximoAno;
			};
		} else {
			if (wltp) {
				ValorISVCO2_EsteAno = ValorISVCO2Gasolina_EsteAno;
				ValorISVCO2_ProximoAno = ValorISVCO2GasolinaWLTP_ProximoAno;
			} else {
				ValorISVCO2_EsteAno = ValorISVCO2Gasolina_EsteAno;
				ValorISVCO2_ProximoAno = ValorISVCO2Gasolina_ProximoAno;
			};
		};
		// aplicamos o desconto dos híbridos à componente ambiental 
		ValorISVCO2_EsteAno = ValorISVCO2_EsteAno * BeneficioHibrido;
		ValorISVCO2_ProximoAno = ValorISVCO2_ProximoAno * BeneficioHibrido;
	// vamos calcular a componente CO2 com os descontos da idade
		// novo
		var ValorISVCO2Novo_ProximoAno = ValorISVCO2_ProximoAno;
		// até 6 meses
		var ValorISVCO2Ate6Meses_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeAte6Meses);
		// 6 meses a 1 ano
		var ValorISVCO2Mais6Mesesa_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais6Mesesa);
		var ValorISVCO2Mais6Mesesa_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais6Mesesa);
		var ValorISVTotalMais6Mesesa_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais6Mesesa);
		// 1 a 2 anos
		var ValorISVCO2Mais1a2Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais1a2Anos);
		var ValorISVCO2Mais1a2Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais1a2Anos);
		var ValorISVTotalMais1a2Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais1a2Anos);
		// 2 a 3 anos
		var ValorISVCO2Mais2a3Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais2a3Anos);
		var ValorISVCO2Mais2a3Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais2a3Anos);
		var ValorISVTotalMais2a3Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais2a3Anos);
		// 3 a 4 anos
		var ValorISVCO2Mais3a4Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais3a4Anos);
		var ValorISVCO2Mais3a4Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais3a4Anos);
		var ValorISVTotalMais3a4Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais3a4Anos);
		// 4 a 5 anos
		var ValorISVCO2Mais4a5Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais4a5Anos);
		var ValorISVCO2Mais4a5Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais4a5Anos);
		var ValorISVTotalMais4a5Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais4a5Anos);
		// 5 a 6 anos
		var ValorISVCO2Mais5a6Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais5a6Anos);
		var ValorISVCO2Mais5a6Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais5a6Anos);
		var ValorISVTotalMais5a6Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais5a6Anos);
		// 6 a 7 anos
		var ValorISVCO2Mais6a7Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais6a7Anos);
		var ValorISVCO2Mais6a7Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais6a7Anos);
		var ValorISVTotalMais6a7Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais6a7Anos);
		// 7 a 8 anos
		var ValorISVCO2Mais7a8Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais7a8Anos);
		var ValorISVCO2Mais7a8Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais7a8Anos);
		var ValorISVTotalMais7a8Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais7a8Anos);
		// 8 a 9 anos
		var ValorISVCO2Mais8a9Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais8a9Anos);
		var ValorISVCO2Mais8a9Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais8a9Anos);
		var ValorISVTotalMais8a9Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais8a9Anos);
		// 9 a 10 anos
		var ValorISVCO2Mais9a10Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais9a10Anos);
		var ValorISVCO2Mais9a10Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais9a10Anos);
		var ValorISVTotalMais9a10Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais9a10Anos);
		// 10 a 11 anos
		var ValorISVCO2Mais10a1s_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais10a1s);
		var ValorISVCO2Mais10a1s_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais10a1s);
		var ValorISVTotalMais10a1s_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais10a1s);
		// 11 a 12 anos
		var ValorISVCO2Mais11a12Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais11a12Anos);
		var ValorISVCO2Mais11a12Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais11a12Anos);
		var ValorISVTotalMais11a12Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais11a12Anos);
		// 12 a 13 anos
		var ValorISVCO2Mais12a13Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais12a13Anos);
		var ValorISVCO2Mais12a13Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais12a13Anos);
		var ValorISVTotalMais12a13Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais12a13Anos);
		// 13 a 14 anos
		var ValorISVCO2Mais13a14Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais13a14Anos);
		var ValorISVCO2Mais13a14Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais13a14Anos);
		var ValorISVTotalMais13a14Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais13a14Anos);
		// 14 a 15 anos
		var ValorISVCO2Mais14a15Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais14a15Anos);
		var ValorISVCO2Mais14a15Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais14a15Anos);
		var ValorISVTotalMais14a15Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais14a15Anos);
		// Mais de 15 anos
		var ValorISVCO2Mais15Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais15Anos);
		var ValorISVCO2Mais15Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais15Anos);
		var ValorISVTotalMais15Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais15Anos);

	// vamos calcular o IVA
		var ValorIVANovo_EsteAno = (ValorISVcm3_EsteAno + ValorISVCO2_EsteAno) * ValorIVA;
		var ValorIVANovo_ProximoAno = (ValorISVcm3_ProximoAno + ValorISVCO2_ProximoAno) * ValorIVA;
		var ValorIVANaoUE_EsteAno = (ValorISVcm3_EsteAno + ValorISVCO2_EsteAno + ValorTaxas + ValorCarro) * ValorIVA;
		var ValorIVANaoUE_ProximoAno = (ValorISVcm3_ProximoAno + ValorISVCO2_ProximoAno + ValorTaxas + ValorCarro) * ValorIVA;
		var ValorIVAAte6Meses_EsteAno = (ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeAte6Meses) + ValorISVCO2_EsteAno + ValorCarro) * ValorIVA;
		var ValorIVAAte6Meses_ProximoAno = (ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeAte6Meses) + ValorISVCO2_ProximoAno + ValorCarro) * ValorIVA;
		
	// vamos somar todas as parcelas, cilindrada, CO2, IVA e custos
		// novo
		var ValorISVNovo_EsteAno = (ValorISVcm3_EsteAno + ValorISVCO2_EsteAno);
		var ValorISVNovo_ProximoAno = (ValorISVcm3_ProximoAno + ValorISVCO2_ProximoAno);
		var ValorTotalNovo_EsteAno = ((ValorISVcm3_EsteAno + ValorISVCO2_EsteAno) * ValorPercentagemIVA);
		var ValorTotalNovo_ProximoAno = ((ValorISVcm3_ProximoAno + ValorISVCO2_ProximoAno) * ValorPercentagemIVA);
		var ValorTotalNovo_DiferencaAnos = ValorTotalNovo_ProximoAno - ValorTotalNovo_EsteAno;
		// não UE
		var ValorTotalNaoUE_EsteAno = (ValorISVcm3_EsteAno + ValorISVCO2_EsteAno + ValorTaxas + ValorIVANaoUE_EsteAno + ValorDespesasImportacao);
		var ValorTotalNaoUE_ProximoAno = (ValorISVcm3_ProximoAno + ValorISVCO2_ProximoAno + ValorTaxas + ValorIVANaoUE_ProximoAno + ValorDespesasImportacao);
		var ValorTotalNaoUE_DiferencaAnos = ValorTotalNaoUE_ProximoAno - ValorTotalNaoUE_EsteAno;
		// até 6 meses
		var ValorISVAte6Meses_EsteAno = (ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeAte6Meses) + ValorISVCO2_EsteAno);
		var ValorISVAte6Meses_ProximoAno = (ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeAte6Meses) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeAte6Meses)));
		var ValorTotalAte6Meses_EsteAno = ((ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeAte6Meses) + ValorISVCO2_EsteAno + ValorCarro) * ValorPercentagemIVA) + ValorDespesasImportacao;
		var ValorTotalAte6Meses_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeAte6Meses) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeAte6Meses)) + ValorCarro) * ValorPercentagemIVA) + ValorDespesasImportacao;
		var ValorTotalAte6Meses_DiferencaAnos = ValorTotalAte6Meses_ProximoAno - ValorTotalAte6Meses_EsteAno;
		var ValorTotalAte6Meses_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeAte6Meses) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeAte6Meses)) + ValorCarro) * ValorPercentagemIVA) + ValorDespesasImportacao;
		var ValorTotalAte6Meses_DiferencaFuturo = ValorTotalAte6Meses_ProximoAno - ValorTotalAte6Meses_ProximoAnoFuturo;
		// 6 meses a 1 ano
		var ValorTotalMais6Mesesa_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais6Mesesa) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais6Mesesa_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais6Mesesa) + ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais6Mesesa) + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais6Mesesa_DiferencaAnos = ValorTotalMais6Mesesa_ProximoAno - ValorTotalMais6Mesesa_EsteAno;
		var ValorTotalMais6Mesesa_ProximoAnoFuturo = (ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais6Mesesa) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais6Mesesa)) + ValorCarro) + ValorDespesasImportacao;
		var ValorTotalMais6Mesesa_DiferencaFuturo = ValorTotalMais6Mesesa_ProximoAno - ValorTotalMais6Mesesa_ProximoAnoFuturo;
		// 1 a 2 anos
		var ValorTotalMais1a2Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais1a2Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais1a2Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais1a2Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais1a2Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais1a2Anos_DiferencaAnos = ValorTotalMais1a2Anos_ProximoAno - ValorTotalMais1a2Anos_EsteAno;
		var ValorTotalMais1a2Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais1a2Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais1a2Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais1a2Anos_DiferencaFuturo = ValorTotalMais1a2Anos_ProximoAno - ValorTotalMais1a2Anos_ProximoAnoFuturo;
		// 2 a 3 anos
		var ValorTotalMais2a3Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais2a3Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais2a3Anos_ProximoAno = (ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais2a3Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais2a3Anos)) + ValorCarro) + ValorDespesasImportacao;
		var ValorTotalMais2a3Anos_DiferencaAnos = ValorTotalMais2a3Anos_ProximoAno - ValorTotalMais2a3Anos_EsteAno;
		var ValorTotalMais2a3Anos_ProximoAnoFuturo = (ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais2a3Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais2a3Anos)) + ValorCarro) + ValorDespesasImportacao;
		var ValorTotalMais2a3Anos_DiferencaFuturo = ValorTotalMais2a3Anos_ProximoAno - ValorTotalMais2a3Anos_ProximoAnoFuturo;
		// 3 a 4 anos
		var ValorTotalMais3a4Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais3a4Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais3a4Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais3a4Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais3a4Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais3a4Anos_DiferencaAnos = ValorTotalMais3a4Anos_ProximoAno - ValorTotalMais3a4Anos_EsteAno;
		var ValorTotalMais3a4Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais3a4Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais3a4Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais3a4Anos_DiferencaFuturo = ValorTotalMais3a4Anos_ProximoAno - ValorTotalMais3a4Anos_ProximoAnoFuturo;
		// 4 a 5 anos
		var ValorTotalMais4a5Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais4a5Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais4a5Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais4a5Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais4a5Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais4a5Anos_DiferencaAnos = ValorTotalMais4a5Anos_ProximoAno - ValorTotalMais4a5Anos_EsteAno;
		var ValorTotalMais4a5Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais4a5Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais4a5Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais4a5Anos_DiferencaFuturo = ValorTotalMais4a5Anos_ProximoAno - ValorTotalMais4a5Anos_ProximoAnoFuturo;
		// 5 a 6 anos
		var ValorTotalMais5a6Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais5a6Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais5a6Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais5a6Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais5a6Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais5a6Anos_DiferencaAnos = ValorTotalMais5a6Anos_ProximoAno - ValorTotalMais5a6Anos_EsteAno;
		var ValorTotalMais5a6Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais5a6Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais5a6Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais5a6Anos_DiferencaFuturo = ValorTotalMais5a6Anos_ProximoAno - ValorTotalMais5a6Anos_ProximoAnoFuturo;
		// 6 a 7 anos
		var ValorTotalMais6a7Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais6a7Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais6a7Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais6a7Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais6a7Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais6a7Anos_DiferencaAnos = ValorTotalMais6a7Anos_ProximoAno - ValorTotalMais6a7Anos_EsteAno;
		var ValorTotalMais6a7Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais6a7Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais6a7Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais6a7Anos_DiferencaFuturo = ValorTotalMais6a7Anos_ProximoAno - ValorTotalMais6a7Anos_ProximoAnoFuturo;
		// 7 a 8 anos
		var ValorTotalMais7a8Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais7a8Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais7a8Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais7a8Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais7a8Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais7a8Anos_DiferencaAnos = ValorTotalMais7a8Anos_ProximoAno - ValorTotalMais7a8Anos_EsteAno;
		var ValorTotalMais7a8Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais7a8Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais7a8Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais7a8Anos_DiferencaFuturo = ValorTotalMais7a8Anos_ProximoAno - ValorTotalMais7a8Anos_ProximoAnoFuturo;
		// 8 a 9 anos
		var ValorTotalMais8a9Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais8a9Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais8a9Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais8a9Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais8a9Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais8a9Anos_DiferencaAnos = ValorTotalMais8a9Anos_ProximoAno - ValorTotalMais8a9Anos_EsteAno;
		var ValorTotalMais8a9Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais8a9Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais8a9Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais8a9Anos_DiferencaFuturo = ValorTotalMais8a9Anos_ProximoAno - ValorTotalMais8a9Anos_ProximoAnoFuturo;
		// 9 a 10 anos
		var ValorTotalMais9a10Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais9a10Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais9a10Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais9a10Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais9a10Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais9a10Anos_DiferencaAnos = ValorTotalMais9a10Anos_ProximoAno - ValorTotalMais9a10Anos_EsteAno;
		var ValorTotalMais9a10Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais9a10Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais9a10Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais9a10Anos_DiferencaFuturo = ValorTotalMais9a10Anos_ProximoAno - ValorTotalMais9a10Anos_ProximoAnoFuturo;
		// 10 a 11 anos
		var ValorTotalMais10a1s_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais10a1s) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais10a1s_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais10a1s) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais10a1s)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais10a1s_DiferencaAnos = ValorTotalMais10a1s_ProximoAno - ValorTotalMais10a1s_EsteAno;
		var ValorTotalMais10a1s_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais10a1s) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais10a1s)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais10a1s_DiferencaFuturo = ValorTotalMais10a1s_ProximoAno - ValorTotalMais10a1s_ProximoAnoFuturo;
		// 11 a 12 anos
		var ValorTotalMais11a12Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais11a12Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais11a12Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais11a12Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais11a12Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais11a12Anos_DiferencaAnos = ValorTotalMais11a12Anos_ProximoAno - ValorTotalMais11a12Anos_EsteAno;
		var ValorTotalMais11a12Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais11a12Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais11a12Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais11a12Anos_DiferencaFuturo = ValorTotalMais11a12Anos_ProximoAno - ValorTotalMais11a12Anos_ProximoAnoFuturo;
		// 12 a 13 anos
		var ValorTotalMais12a13Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais12a13Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais12a13Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais12a13Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais12a13Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais12a13Anos_DiferencaAnos = ValorTotalMais12a13Anos_ProximoAno - ValorTotalMais12a13Anos_EsteAno;
		var ValorTotalMais12a13Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais12a13Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais12a13Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais12a13Anos_DiferencaFuturo = ValorTotalMais12a13Anos_ProximoAno - ValorTotalMais12a13Anos_ProximoAnoFuturo;
		// 13 a 14 anos
		var ValorTotalMais13a14Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais13a14Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais13a14Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais13a14Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais13a14Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais13a14Anos_DiferencaAnos = ValorTotalMais13a14Anos_ProximoAno - ValorTotalMais13a14Anos_EsteAno;
		var ValorTotalMais13a14Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais13a14Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais13a14Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais13a14Anos_DiferencaFuturo = ValorTotalMais13a14Anos_ProximoAno - ValorTotalMais13a14Anos_ProximoAnoFuturo;
		// 14 a 15 anos
		var ValorTotalMais14a15Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais14a15Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais14a15Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais14a15Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais14a15Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais14a15Anos_DiferencaAnos = ValorTotalMais14a15Anos_ProximoAno - ValorTotalMais14a15Anos_EsteAno;
		var ValorTotalMais14a15Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais14a15Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais14a15Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais14a15Anos_DiferencaFuturo = ValorTotalMais14a15Anos_ProximoAno - ValorTotalMais14a15Anos_ProximoAnoFuturo;
		// mais de 15 anos
		var ValorTotalMais15Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais15Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais15Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais15Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais15Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais15Anos_DiferencaAnos = ValorTotalMais15Anos_ProximoAno - ValorTotalMais15Anos_EsteAno;
		var ValorTotalMais15Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais15Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais15Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais15Anos_DiferencaFuturo = ValorTotalMais15Anos_ProximoAno - ValorTotalMais15Anos_ProximoAnoFuturo;
		// vamos calcular agora o IUC

		
  
		// Se não for UE
		if (!isUE && age === 0) {
			return {
				// coluna este ano
				resultNaoUE:  +Number(Math.max(ValorISVMinimo,ValorTotalNaoUE_EsteAno)).toFixed(2),
				resultNaoUECilindrada:  +Number(ValorISVcm3Novo_EsteAno).toFixed(2),
				resultNaoUETaxas:  "Taxas " + +Number(ValorTaxas).toFixed(2),
				resultNaoUECO2:  +Number(ValorISVCO2_EsteAno).toFixed(2),
				resultNaoUEISV:  +Number(ValorISVNovo_EsteAno).toFixed(2),	
				resultNaoUEIVA:  +Number(ValorIVANaoUE_EsteAno).toFixed(2),
			}
		} else if (!isUE) {
			return {
				// coluna próximo ano
				result:  +Number(Math.max(ValorISVMinimo,ValorTotalNaoUE_ProximoAno)).toFixed(2),
				resultDiferenca:  (ValorTotalNaoUE_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + +Number(ValorTotalNaoUE_DiferencaAnos).toFixed(2) + "€</span>",
				resultCilindrada:  +Number(ValorISVcm3Novo_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2_ProximoAno).toFixed(2),
				resultISV:  +Number(ValorISVNovo_ProximoAno).toFixed(2),			
				resultTaxas:  +Number(ValorTaxas).toFixed(2),
				resultIVA:  +Number(ValorIVANaoUE_ProximoAno).toFixed(2),
			}
		}

		// Se for UE
		if (age === 0) {
			return {
				result: +Number(Math.max(ValorISVMinimo,ValorTotalNovo_ProximoAno)).toFixed(2),
				resultCilindrada: +Number(ValorISVcm3Novo_ProximoAno).toFixed(2),
				resultCO2: +Number(ValorISVCO2Novo_ProximoAno).toFixed(2),
				resultISV: +Number(ValorISVNovo_ProximoAno).toFixed(2),
				resultIVA: +Number(ValorIVANovo_ProximoAno).toFixed(2),
			}
		} else if (age === 6) {
			return {
				result: +Number(Math.max(ValorISVMinimo,ValorTotalAte6Meses_ProximoAno)).toFixed(2),
				resultCilindrada: +Number(ValorISVcm3Ate6Meses_ProximoAno).toFixed(2),
				resultCO2: +Number(ValorISVCO2Ate6Meses_ProximoAno).toFixed(2),
				resultISV: +Number(ValorISVAte6Meses_ProximoAno).toFixed(2),
				resultIVA: +Number(ValorIVAAte6Meses_ProximoAno).toFixed(2),
			}
		} else if (age < 12) {
			return {
				result: +Number(Math.max(ValorISVMinimo,ValorTotalMais6Mesesa_ProximoAno)).toFixed(2),
				resultCilindrada: +Number(ValorISVcm3Mais6Mesesa_ProximoAno).toFixed(2),
				resultCO2: +Number(ValorISVCO2Mais6Mesesa_ProximoAno).toFixed(2),
			}
		} else if (age < 2*12) {
			return {
				result: +Number(Math.max(ValorISVMinimo,ValorTotalMais1a2Anos_ProximoAno)).toFixed(2),
				resultCilindrada: +Number(ValorISVcm3Mais1a2Anos_ProximoAno).toFixed(2),
				resultCO2: +Number(ValorISVCO2Mais1a2Anos_ProximoAno).toFixed(2),
			}
		} else if (age < 3*12) {
			return {
				result: +Number(Math.max(ValorISVMinimo,ValorTotalMais2a3Anos_ProximoAno)).toFixed(2),
				resultCilindrada: +Number(ValorISVcm3Mais2a3Anos_ProximoAno).toFixed(2),
				resultCO2: +Number(ValorISVCO2Mais2a3Anos_ProximoAno).toFixed(2),
				resultFuturo: +Number(Math.max(ValorISVMinimo,ValorTotalMais2a3Anos_ProximoAnoFuturo)).toFixed(2),
			}
		} else if (age < 4*12) {
			return {
				result: +Number(Math.max(ValorISVMinimo,ValorTotalMais3a4Anos_ProximoAno)).toFixed(2),
				resultCilindrada: +Number(ValorISVcm3Mais3a4Anos_ProximoAno).toFixed(2),
				resultCO2: +Number(ValorISVCO2Mais3a4Anos_ProximoAno).toFixed(2),
				resultFuturo: +Number(Math.max(ValorISVMinimo,ValorTotalMais3a4Anos_ProximoAnoFuturo)).toFixed(2),
			}
		} else if (age < 5*12) {
			return {		
				result: +Number(Math.max(ValorISVMinimo,ValorTotalMais4a5Anos_ProximoAno)).toFixed(2),
				resultCilindrada: +Number(ValorISVcm3Mais4a5Anos_ProximoAno).toFixed(2),
				resultCO2: +Number(ValorISVCO2Mais4a5Anos_ProximoAno).toFixed(2),
			}
		} else if (age < 6*12) {
			return {
				result: +Number(Math.max(ValorISVMinimo,ValorTotalMais5a6Anos_ProximoAno)).toFixed(2),
				resultCilindrada:  +Number(ValorISVcm3Mais5a6Anos_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2Mais5a6Anos_ProximoAno).toFixed(2),
			}
		} else if (age < 7*12) {
			return {
				result:  +Number(Math.max(ValorISVMinimo,ValorTotalMais6a7Anos_ProximoAno)).toFixed(2),
				resultCilindrada:  +Number(ValorISVcm3Mais6a7Anos_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2Mais6a7Anos_ProximoAno).toFixed(2),
			}
		} else if (age < 8*12) {
			return {
				result:  +Number(Math.max(ValorISVMinimo,ValorTotalMais7a8Anos_ProximoAno)).toFixed(2),
				resultCilindrada:  +Number(ValorISVcm3Mais7a8Anos_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2Mais7a8Anos_ProximoAno).toFixed(2),
			}
		} else if (age < 9*12) {
			return {
				result:  +Number(Math.max(ValorISVMinimo,ValorTotalMais8a9Anos_ProximoAno)).toFixed(2),
				resultCilindrada:  +Number(ValorISVcm3Mais8a9Anos_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2Mais8a9Anos_ProximoAno).toFixed(2),
			}
		} else if (age < 10*12) {
			return {
				result:  +Number(Math.max(ValorISVMinimo,ValorTotalMais9a10Anos_ProximoAno)).toFixed(2),
				resultCilindrada:  +Number(ValorISVcm3Mais9a10Anos_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2Mais9a10Anos_ProximoAno).toFixed(2),			}
		} else if (age < 11*12) {
			return {
				result:  +Number(Math.max(ValorISVMinimo,ValorTotalMais10a1s_ProximoAno)).toFixed(2),
				resultCilindrada:  +Number(ValorISVcm3Mais10a1s_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2Mais10a1s_ProximoAno).toFixed(2),
			}
		} else if (age < 12*12) {
			return {
				result:  +Number(Math.max(ValorISVMinimo,ValorTotalMais11a12Anos_ProximoAno)).toFixed(2),
				resultCilindrada:  +Number(ValorISVcm3Mais11a12Anos_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2Mais11a12Anos_ProximoAno).toFixed(2),
			}
		} else if (age < 13*12) {
			return {
				result:  +Number(Math.max(ValorISVMinimo,ValorTotalMais12a13Anos_ProximoAno)).toFixed(2),
				resultCilindrada:  +Number(ValorISVcm3Mais12a13Anos_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2Mais12a13Anos_ProximoAno).toFixed(2),
			}
		} else if (age < 14*12) {
			return {		
				result:  +Number(Math.max(ValorISVMinimo,ValorTotalMais13a14Anos_ProximoAno)).toFixed(2),
				resultCilindrada:  +Number(ValorISVcm3Mais13a14Anos_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2Mais13a14Anos_ProximoAno).toFixed(2),
			}
		} else if (age < 15*12) {
			return {		
				result:  +Number(Math.max(ValorISVMinimo,ValorTotalMais14a15Anos_ProximoAno)).toFixed(2),
				resultCilindrada:  +Number(ValorISVcm3Mais14a15Anos_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2Mais14a15Anos_ProximoAno).toFixed(2),
			}
		} else if (age < 16*12) {
			return {
				result:  +Number(Math.max(ValorISVMinimo,ValorTotalMais15Anos_ProximoAno)).toFixed(2),
				resultCilindrada:  +Number(ValorISVcm3Mais15Anos_ProximoAno).toFixed(2),
				resultCO2:  +Number(ValorISVCO2Mais15Anos_ProximoAno).toFixed(2),
			}
		}
	};
};
