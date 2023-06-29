// Defino as variáveis
// preciso mesmo da palavra valor à frente das variáveis?!

	// variável da cilindrada do ISV, será boa ideia criar duas variáveis, uma para cada imposto? é que a variável não muda, é sempre a mesma!
    var DadosISVcm3 = 0;
	// variável do CO2
		var DadosISVCO2 = 0;
	// para poder calcular o IUC atribuo o mesmo valor da cilindrada à variável do IUC 
		var DadosIUCcm3 = DadosISVcm3;
	// faço a cópia do valor para a variável do IUC para fazer o cálculo do IUC
		var DadosIUCCO2 = DadosISVCO2;
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
		var SimboloEuro = "€";
		var DadosISVCO2WLTP = "";
	// defino as variáveis com os descontos da idade cilindrada
		var DescontoIdadeAte6Meses = 0.1;
		var DescontoIdadeMais6Mesesa1Ano = 0.1;
		var DescontoIdadeMais1a2Anos = 0.2;
		var DescontoIdadeMais2a3Anos = 0.28;
		var DescontoIdadeMais3a4Anos = 0.35;
		var DescontoIdadeMais4a5Anos = 0.43;
		var DescontoIdadeMais5a6Anos = 0.52;
		var DescontoIdadeMais6a7Anos = 0.6;
		var DescontoIdadeMais7a8Anos = 0.65;
		var DescontoIdadeMais8a9Anos = 0.7;
		var DescontoIdadeMais9a10Anos = 0.75;
		var DescontoIdadeMais10a11Anos = 0.8;
		var DescontoIdadeMais11a12Anos = 0.8;
		var DescontoIdadeMais12a13Anos = 0.8;
		var DescontoIdadeMais13a14Anos = 0.8;
		var DescontoIdadeMais14a15Anos = 0.8;
		var DescontoIdadeMais15Anos = 0.8;

	// defino as variáveis com os descontos da idade CO2
		var DescontoCO2IdadeAte6Meses = 0.10;
		var DescontoCO2IdadeMais6Mesesa1Ano = 0.10;
		var DescontoCO2IdadeMais1a2Anos = 0.10;
		var DescontoCO2IdadeMais2a3Anos = 0.20;
		var DescontoCO2IdadeMais3a4Anos = 0.20;
		var DescontoCO2IdadeMais4a5Anos = 0.28;
		var DescontoCO2IdadeMais5a6Anos = 0.28;
		var DescontoCO2IdadeMais6a7Anos = 0.35;
		var DescontoCO2IdadeMais7a8Anos = 0.43;
		var DescontoCO2IdadeMais8a9Anos = 0.43;
		var DescontoCO2IdadeMais9a10Anos = 0.52;
		var DescontoCO2IdadeMais10a11Anos = 0.60;
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
		var ValorISVTotal_EsteAno = ValorISVcm3_EsteAno + ValorISVCO2_EsteAno;
		var ValorISVTotal_ProximoAno = ValorISVcm3_ProximoAno + ValorISVCO2_ProximoAno;
		
// Vou buscar os dados aos campos se estiverem preenchidos e atribuo-os às variáveis

	// vou buscar a cilindrada ao campo
		if (document.getElementById("CampoDadoscm3").value > 0) {
			var DadosISVcm3 = (Number(document.getElementById("CampoDadoscm3").value));
		};
	// se a cilindrada foi escolhida da dropdown box vou lá buscar o valor
		if (document.getElementById("CampoDadoscm3Prepreenchido").value > 1) {
			var DadosISVcm3 = (Number(document.getElementById("CampoDadoscm3Prepreenchido").value));
		};
	// agora vou buscar o CO2 ao campo
		var DadosISVCO2 = (Number(document.getElementById("CampoDadosCO2").value));
		var DadosISVCO2_ProximoAno = (Number(document.getElementById("CampoDadosCO2").value));
	// vejo qual foi o combustível escolhido para definir uma variável para depois dar feedback ao utilizador do combustível que está activo para a simulação
		if (document.getElementById("CombustivelGasoleo").checked) {
			var DadosCombustivel = "Gasoleo";
		} else {
			var DadosCombustivel = "Gasolina";
		};
	// vou buscar o valor do carro ao campo para apresentar a simulação com o valor do carro incluído, para calcular o valor das taxas aduaneiras a 10% e coloco/retiro os avisos para as importações fora UE
		if (Number(document.getElementById("CampoValorCarro").value) > 0) {
			var ValorCarro = Number(document.getElementById("CampoValorCarro").value);
			var ValorTaxas = ValorCarro * TaxasAduaneirasPercentagem;
			document.getElementById("LinhaMatriculaNaoUEAviso").style.display = "none";
			document.getElementById("LinhaCustoCarroAviso").style.display = "table-row";
		} else {
			document.getElementById("LinhaMatriculaNaoUEAviso").style.display = "table-row";
			document.getElementById("LinhaCustoCarroAviso").style.display = "none";	
		};

// Cálculos preliminares

	// aplicar a tabela de reduções de CO2 WLTP em 2019
	// conforme o escalão do CO2, atribuo uma percentagem de redução 
	// em 2020 há tabelas exclusivas para WLTP daí que só vou usar estes dados para a simulação de 2019
		if (document.getElementById("CampoEmissoesWLTP").checked) {
			if (document.getElementById("CombustivelGasoleo").checked) {
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
	// variável para dar feedback no resultado da simulação
			DadosISVCO2WLTP = DadosISVCO2 + "g/km CO2 WLTP 2019<br />";
		};
	// desconto dado aos híbridos
		if (document.getElementById("CampoCombustivelHibrido").checked) {
			BeneficioHibrido = BeneficioHibridoNormalPercentagem;
		};
		if (document.getElementById("CampoCombustivelHibridoPlugin").checked) {
			BeneficioHibrido = BeneficioHibridoPlugInPercentagem;
		};	
	// se a checkbox das despesas estiver activa adiciono esse valor à variável mas a variável fica já com valor zero
		if (document.getElementById("CampoValorDespesas").checked == true) {
			var ValorDespesasImportacao = 1250;
		};
	// vamos calcular a componente cilindrada que é comum ao NEDC e WLTP, coloco a operação lógica porque há pessoas que não preenchem a cilindrada e eu não quero apresentar simulações sem esse dado, o 100 é escolhido por ser um mínimo de 3 algarismos, ao mesmo tempo que preenche o campo, aparece o campo seguinte do CO2, tenho que definir dois anos para poder fazer as comparações entre orçamentos de estado
		if (DadosISVcm3 > 100) {
			document.getElementById("CampoEmissoesCabecalho").style.display = "table-row";
			document.getElementById("CampoEmissoesEscolha").style.display = "table-row";
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
		} else {
	// se a cilindrada baixar dos 100, se apagar o campo, não faz sentido que o campo do CO2 apareça
			document.getElementById("CampoEmissoesCabecalho").style.display = "none";
			document.getElementById("CampoEmissoesEscolha").style.display = "none";
		};
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
		var ValorISVTotalAte6Meses_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeAte6Meses);
		// 6 meses a 1 ano
		var ValorISVcm3Mais6Mesesa1Ano_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais6Mesesa1Ano);
		var ValorISVcm3Mais6Mesesa1Ano_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais6Mesesa1Ano);
		var ValorISVTotalMais6Mesesa1Ano_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais6Mesesa1Ano);
		// 1 a 2 anos
		var ValorISVcm3Mais1a2Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais1a2Anos);
		var ValorISVcm3Mais1a2Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais1a2Anos);
		var ValorISVTotalMais1a2Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais1a2Anos);
		// 2 a 3 anos
		var ValorISVcm3Mais2a3Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais2a3Anos);
		var ValorISVcm3Mais2a3Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais2a3Anos);
		var ValorISVTotalMais2a3Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais2a3Anos);
		// 3 a 4 anos
		var ValorISVcm3Mais3a4Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais3a4Anos);
		var ValorISVcm3Mais3a4Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais3a4Anos);
		var ValorISVTotalMais3a4Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais3a4Anos);
		// 4 a 5 anos
		var ValorISVcm3Mais4a5Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais4a5Anos);
		var ValorISVcm3Mais4a5Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais4a5Anos);
		var ValorISVTotalMais4a5Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais4a5Anos);
		// 5 a 6 anos
		var ValorISVcm3Mais5a6Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais5a6Anos);
		var ValorISVcm3Mais5a6Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais5a6Anos);
		var ValorISVTotalMais5a6Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais5a6Anos);
		// 6 a 7 anos
		var ValorISVcm3Mais6a7Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais6a7Anos);
		var ValorISVcm3Mais6a7Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais6a7Anos);
		var ValorISVTotalMais6a7Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais6a7Anos);
		// 7 a 8 anos
		var ValorISVcm3Mais7a8Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais7a8Anos);
		var ValorISVcm3Mais7a8Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais7a8Anos);
		var ValorISVTotalMais7a8Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais7a8Anos);
		// 8 a 9 anos
		var ValorISVcm3Mais8a9Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais8a9Anos);
		var ValorISVcm3Mais8a9Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais8a9Anos);
		var ValorISVTotalMais8a9Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais8a9Anos);
		// 9 a 10 anos
		var ValorISVcm3Mais9a10Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais9a10Anos);
		var ValorISVcm3Mais9a10Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais9a10Anos);
		var ValorISVTotalMais9a10Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais9a10Anos);
		// 10 a 11 anos
		var ValorISVcm3Mais10a11Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais10a11Anos);
		var ValorISVcm3Mais10a11Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais10a11Anos);
		var ValorISVTotalMais10a11Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais10a11Anos);
		// 11 a 12 anos
		var ValorISVcm3Mais11a12Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais11a12Anos);
		var ValorISVcm3Mais11a12Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais11a12Anos);
		var ValorISVTotalMais11a12Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais11a12Anos);
		// 12 a 13 anos
		var ValorISVcm3Mais12a13Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais12a13Anos);
		var ValorISVcm3Mais12a13Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais12a13Anos);
		var ValorISVTotalMais12a13Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais12a13Anos);
		// 13 a 14 anos
		var ValorISVcm3Mais13a14Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais13a14Anos);
		var ValorISVcm3Mais13a14Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais13a14Anos);
		var ValorISVTotalMais13a14Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais13a14Anos);
		// 14 a 15 anos
		var ValorISVcm3Mais14a15Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais14a15Anos);
		var ValorISVcm3Mais14a15Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais14a15Anos);
		var ValorISVTotalMais14a15Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais14a15Anos);
		// mais de 15 anos
		var ValorISVcm3Mais15Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais15Anos);
		var ValorISVcm3Mais15Anos_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais15Anos);
		var ValorISVTotalMais15Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoIdadeMais15Anos);
	// definir as variáveis do valor do CO2
		var ValorISVCO2Gasoleo_EsteAno = 0;
		var ValorISVCO2Gasoleo_ProximoAno = 0;
		var ValorISVCO2Gasolina_EsteAno = 0;
		var ValorISVCO2Gasolina_ProximoAno = 0;
	// vou calcular o valor da componente ambiental, o CO2
		if (DadosISVCO2 > 0) {
			// se o campo CO2 foi preenchido, vamos apresentar os próximos campos: combustível, desconto híbridos e a idade
			document.getElementById("CampoCombustivelCabecalho").style.display = "table-row";
			document.getElementById("CampoCombustivelEscolha").style.display = "table-row";
			document.getElementById("CampoCombustivelEscolhaHibrido").style.display = "table-row";
			document.getElementById("CampoCombustivelEscolhaHibridoAviso").style.display = "table-row";
			document.getElementById("CampoIdadeCabecalho").style.display = "table-row";
			document.getElementById("CampoIdadeEscolha").style.display = "table-row";
			// se na idade se escolher novo em Portugal, o campo do preço não deve aparecer, para que se possa apenas saber o valor do ISV
			if (document.getElementById("CampoIdade").value == 99) {
				document.getElementById("CampoPrecoCabecalho").style.display = "none";
				document.getElementById("CampoPrecoEscolha").style.display = "none";
				document.getElementById("CampoPrecoDespesas").style.display = "none";
			} else {
				document.getElementById("CampoPrecoCabecalho").style.display = "table-row";
				document.getElementById("CampoPrecoEscolha").style.display = "table-row";
				document.getElementById("CampoPrecoDespesas").style.display = "table-row";
			};
			// cálculo do CO2 em 2019, com os escalões de 2019 que são diferentes dos de 2020 por causa do WLTP
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
		} else {
			// se não houver CO2, escondemos os próximos campos
			document.getElementById("CampoCombustivelCabecalho").style.display = "none";
			document.getElementById("CampoCombustivelEscolha").style.display = "none";
			document.getElementById("CampoCombustivelEscolhaHibrido").style.display = "none";
			document.getElementById("CampoCombustivelEscolhaHibridoAviso").style.display = "none";
			document.getElementById("CampoIdadeCabecalho").style.display = "none";
			document.getElementById("CampoIdadeEscolha").style.display = "none";
		};
		// agora separamos o combustível para apresentar o resultado
		if (DadosCombustivel == "Gasoleo") {
			if (document.getElementById("CampoEmissoesWLTP").checked) {
				ValorISVCO2_EsteAno = ValorISVCO2Gasoleo_EsteAno;
				ValorISVCO2_ProximoAno = ValorISVCO2GasoleoWLTP_ProximoAno;
			} else {
				ValorISVCO2_EsteAno = ValorISVCO2Gasoleo_EsteAno;
				ValorISVCO2_ProximoAno = ValorISVCO2Gasoleo_ProximoAno;
			};
		} else {
			if (document.getElementById("CampoEmissoesWLTP").checked) {
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
		var ValorISVCO2Novo_EsteAno = ValorISVCO2_EsteAno;
		var ValorISVCO2Novo_ProximoAno = ValorISVCO2_ProximoAno;
		// até 6 meses
		var ValorISVCO2Ate6Meses_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeAte6Meses);
		var ValorISVCO2Ate6Meses_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeAte6Meses);
		var ValorISVTotalAte6Meses_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeAte6Meses);
		// 6 meses a 1 ano
		var ValorISVCO2Mais6Mesesa1Ano_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais6Mesesa1Ano);
		var ValorISVCO2Mais6Mesesa1Ano_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais6Mesesa1Ano);
		var ValorISVTotalMais6Mesesa1Ano_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais6Mesesa1Ano);
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
		var ValorISVCO2Mais10a11Anos_EsteAno = ValorISVCO2_EsteAno - (ValorISVCO2_EsteAno * DescontoCO2IdadeMais10a11Anos);
		var ValorISVCO2Mais10a11Anos_ProximoAno = ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais10a11Anos);
		var ValorISVTotalMais10a11Anos_ProximoAno = ValorISVTotal_ProximoAno - (ValorISVTotal_ProximoAno * DescontoCO2IdadeMais10a11Anos);
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
		var ValorTotalMais6Mesesa1Ano_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais6Mesesa1Ano) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais6Mesesa1Ano_ProximoAno = ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais6Mesesa1Ano) + ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais6Mesesa1Ano) + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais6Mesesa1Ano_DiferencaAnos = ValorTotalMais6Mesesa1Ano_ProximoAno - ValorTotalMais6Mesesa1Ano_EsteAno;
		var ValorTotalMais6Mesesa1Ano_ProximoAnoFuturo = (ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais6Mesesa1Ano) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais6Mesesa1Ano)) + ValorCarro) + ValorDespesasImportacao;
		var ValorTotalMais6Mesesa1Ano_DiferencaFuturo = ValorTotalMais6Mesesa1Ano_ProximoAno - ValorTotalMais6Mesesa1Ano_ProximoAnoFuturo;
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
		var ValorTotalMais10a11Anos_EsteAno = ValorISVcm3_EsteAno - (ValorISVcm3_EsteAno * DescontoIdadeMais10a11Anos) + ValorISVCO2_EsteAno + ValorCarro + ValorDespesasImportacao;
		var ValorTotalMais10a11Anos_ProximoAno = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais10a11Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoCO2IdadeMais10a11Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais10a11Anos_DiferencaAnos = ValorTotalMais10a11Anos_ProximoAno - ValorTotalMais10a11Anos_EsteAno;
		var ValorTotalMais10a11Anos_ProximoAnoFuturo = ((ValorISVcm3_ProximoAno - (ValorISVcm3_ProximoAno * DescontoIdadeMais10a11Anos) + (ValorISVCO2_ProximoAno - Math.abs(ValorISVCO2_ProximoAno * DescontoIdadeMais10a11Anos)) + ValorCarro)) + ValorDespesasImportacao;
		var ValorTotalMais10a11Anos_DiferencaFuturo = ValorTotalMais10a11Anos_ProximoAno - ValorTotalMais10a11Anos_ProximoAnoFuturo;
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
		/*var ValorIUCcm3_2019 = 0;
		var ValorIUCcm3_2020 = 0;
		var ValorIUCCO2_2019 = 0;
		var ValorIUCCO2_2020 = 0;
		var ValorIUCcm3Adicional_2019 = 0;
		var ValorIUCcm3Adicional_2020 = 0;
		
		if (DadosIUCcm3 > 0) {
			if (DadosIUCcm3 <= 1250) {
				ValorIUCcm3_2019 = 28.92;
				ValorIUCcm3_2020 = 29.30;
				ValorIUCcm3Adicional_2019 = 5.02;
				ValorIUCcm3Adicional_2020 = 5.02;
			} else if (DadosIUCcm3 > 1250 && DadosIUCcm3 <= 1750) {
				ValorIUCcm3_2019 = 58.04;
				ValorIUCcm32019 = 58.79;
				ValorIUCcm3Adicional = 10.07;
				ValorIUCcm3Adicional2019 = 10.07;
			} else if (DadosIUCcm3 > 1750 && DadosIUCcm3 <= 2500) {
				ValorIUCcm3_2019 = 115.96;
				ValorIUCcm32019 = 117.47;
				ValorIUCcm3Adicional = 20.12;
				ValorIUCcm3Adicional2019 = 20.12;
			} else {
				ValorIUCcm3_2019 = 396.86;
				ValorIUCcm32019 = 402.02;
				ValorIUCcm3Adicional = 68.85;
				ValorIUCcm3Adicional2019 = 68.85;
			}
		};
		
		if (DadosCombustivel == "Gasolina") {
			ValorIUCcm3Adicional = 0;
			ValorIUCcm3Adicional2019 = 0;
		};

		if (document.getElementById("CampoEmissoesWLTP").checked) {
			if (DadosIUCCO2_2019 <= 120) {
				DadosIUCCO2_2019 = DadosIUCCO2_2019 - (DadosIUCCO2_2019 * 0.21);
			} else if (DadosIUCCO2_2019 <= 180) {
				DadosIUCCO2_2019 = DadosIUCCO2_2019 - (DadosIUCCO2_2019 * 0.15);
			} else if (DadosIUCCO2_2019 <= 250) {
				DadosIUCCO2_2019 = DadosIUCCO2_2019 - (DadosIUCCO2_2019 * 0.12);
			} else if (DadosIUCCO2_2019 > 250) {
				DadosIUCCO2_2019 = DadosIUCCO2_2019 - (DadosIUCCO2_2019 * 0.5);
			};
		};

		if (DadosIUCCO2_2019 > 0) {
			if (DadosIUCCO2_2019 <= 120) {
				ValorIUCCO2 = 59.33;
			} else if (DadosIUCCO2_2019 > 120 && DadosIUCCO2_2019 <= 180) {
				ValorIUCCO2 = 88.90;
			} else if (DadosIUCCO2_2019 > 180 && DadosIUCCO2_2019 <= 250) {
				ValorIUCCO2 = 193.08 + 28.92;
			} else {
				ValorIUCCO2 = 330.76 + 58.04;
			};
			if (DadosIUCCO2_2019 <= 120) {
				ValorIUCCO22019 = 60.10;
			} else if (DadosIUCCO2_2019 > 120 && DadosIUCCO2_2019 <= 180) {
				ValorIUCCO22019 = 90.06;
			} else if (DadosIUCCO2_2019 > 180 && DadosIUCCO2_2019 <= 250) {
				ValorIUCCO22019 = 195.59 + 28.92;
			} else {
				ValorIUCCO22019 = 335.06 + 58.04;
			};
		};
		
		var ValorIUC_2019 = ((ValorIUCcm3_2019 + ValorIUCCO2_2019) * 1.15) + ValorIUCcm3Adicional_2019;
		var ValorIUC_2020 = ((ValorIUCcm3_2020 + ValorIUCCO2_2020) * 1.15) + ValorIUCcm3Adicional_2020;*/
		var SimuladorValorIUCTexto = "Simulador IUC";
		var SimuladorValorIUCLink = SimuladorValorIUCTexto.link("https://impostosobreveiculos.info/iuc/simulador-iuc/#principal");
	// vamos apresentar os resultados na coluna à direita
		if (DadosISVcm3 > 100 && DadosISVCO2 > 10) {
			// são duas tabelas que alternam conforme há resultados ou não há resultados
			document.getElementById("Simulador2018SemResultados").style.display = "none";
			document.getElementById("Simulador2018Resultados").style.display = "table";
			// vamos mostrar os dados da simulação para dar feedback ao utilizador de que está tudo a ser calculado com os dados que foram inseridos
			if (DadosCombustivel == "Gasoleo") {
				//se for a gasoleo
				document.getElementById("DadosCarroCombustivel").innerHTML = "Gasóleo";
				document.getElementById("DadosCarro").innerHTML = Number(DadosISVcm3) + "cm3<br />" + Number(DadosISVCO2_ProximoAno) + "g/km CO2<br />" + DadosISVCO2WLTP + "Preço compra " + Number(ValorCarro) + "€";
				// enquanto não tenho a simulação do IUC feita, vamos só apresentar um link para o simulador
				/*
				document.getElementById("ValorIUC").innerHTML = Number(ValorIUC).toFixed(2) + "€";
				if (document.getElementById("CampoEmissoesWLTP").checked) {
					document.getElementById("ValorIUC2019").innerHTML = SimuladorValorIUC2019Link;
				} else {
					document.getElementById("ValorIUC2019").innerHTML = Number(ValorIUC2019).toFixed(2) + "€";
				};
				document.getElementById("ValorIUC2019Diferenca").innerHTML = ((ValorIUC2019 - ValorIUC)<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorIUC2019 - ValorIUC).toFixed(2) + "€";
				*/
				document.getElementById("ValorIUC").innerHTML = SimuladorValorIUCLink;
				// mudamos a cor do cabeçalho consoante o combustível, no caso para preto
				document.getElementById("DadosCarroCombustivel").classList.add("gasoleo");
				document.getElementById("DadosCarroCombustivel").classList.remove("gasolina");
			} else {
				// se for a gasolina
				document.getElementById("DadosCarroCombustivel").innerHTML = "Gasolina";
				document.getElementById("DadosCarro").innerHTML = Number(DadosISVcm3) + "cm3<br />" + Number(DadosISVCO2) + "g/km CO2<br />" + DadosISVCO2WLTP + "Preço compra " + Number(ValorCarro) + "€";
				// enquanto não tenho a simulação do IUC feita, vamos só apresentar um link para o simulador
				/*
				document.getElementById("ValorIUC").innerHTML = Number(ValorIUC).toFixed(2) + "€";
				if (document.getElementById("CampoEmissoesWLTP").checked) {
					document.getElementById("ValorIUC2019").innerHTML = SimuladorValorIUC2019Link;
				} else {
					document.getElementById("ValorIUC2019").innerHTML = Number(ValorIUC2019).toFixed(2) + "€";
				};
				document.getElementById("ValorIUC2019Diferenca").innerHTML = ((ValorIUC2019 - ValorIUC)<0?"-<span style='color:green'>":"<span style='color:red'>+") + Number(ValorIUC2019 - ValorIUC).toFixed(2) + "€";
				*/
				document.getElementById("ValorIUC").innerHTML = SimuladorValorIUCLink;
				// mudamos a cor do cabeçalho consoante o combustível, no caso para verde
				document.getElementById("DadosCarroCombustivel").classList.add("gasolina");
				document.getElementById("DadosCarroCombustivel").classList.remove("gasoleo");
			};
			// apresentamos a tabela com os resultados da simulação
			// coluna este ano
			document.getElementById("ResultadosNovo").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalNovo_EsteAno)).toFixed(2) + "€";
			document.getElementById("ResultadosNovoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Novo_EsteAno).toFixed(2) + "€";
			document.getElementById("ResultadosNovoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			document.getElementById("ResultadosNovoISV").innerHTML = "ISV " + Number(ValorISVNovo_EsteAno).toFixed(2)+"€";	
			document.getElementById("ResultadosNovoIVA").innerHTML = "IVA " + Number(ValorIVANovo_EsteAno).toFixed(2)+"€";
			// coluna próximo ano			
			document.getElementById("ResultadosNovo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalNovo_ProximoAno)).toFixed(2) + "€";
			document.getElementById("ResultadosNovo2019Diferenca").innerHTML = (ValorTotalNovo_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalNovo_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("ResultadosNovoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Novo_ProximoAno).toFixed(2) + "€";
			document.getElementById("ResultadosNovoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Novo_ProximoAno).toFixed(2) + "€";
			document.getElementById("ResultadosNovoISV2019").innerHTML = "ISV " + Number(ValorISVNovo_ProximoAno).toFixed(2)+"€";
			document.getElementById("ResultadosNovoIVA2019").innerHTML = "IVA " + Number(ValorIVANovo_ProximoAno).toFixed(2)+"€";

			// até 6 meses
			// coluna este ano
			document.getElementById("ResultadosAte6Meses").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalAte6Meses_EsteAno)).toFixed(2) + "€";
			document.getElementById("ResultadosAte6MesesCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Ate6Meses_EsteAno).toFixed(2) + "€";
			document.getElementById("ResultadosAte6MesesCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			document.getElementById("ResultadosAte6MesesISV").innerHTML = "ISV " + Number(ValorISVAte6Meses_EsteAno).toFixed(2)+"€";
			document.getElementById("ResultadosAte6MesesIVA").innerHTML = "IVA " + Number(ValorIVAAte6Meses_EsteAno).toFixed(2)+"€";
			// coluna próximo ano
			document.getElementById("ResultadosAte6Meses2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalAte6Meses_ProximoAno)).toFixed(2) + "€";
			document.getElementById("ResultadosAte6Meses2019Diferenca").innerHTML = (ValorTotalAte6Meses_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalAte6Meses_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("ResultadosAte6MesesCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Ate6Meses_ProximoAno).toFixed(2) + "€";
			document.getElementById("ResultadosAte6MesesCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Ate6Meses_ProximoAno).toFixed(2) + "€";
			document.getElementById("ResultadosAte6MesesISV2019").innerHTML = "ISV " + Number(ValorISVAte6Meses_ProximoAno).toFixed(2)+"€";
			document.getElementById("ResultadosAte6MesesIVA2019").innerHTML = "IVA " + Number(ValorIVAAte6Meses_ProximoAno).toFixed(2)+"€";
			document.getElementById("ResultadosAte6MesesFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalAte6Meses_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("ResultadosAte6MesesFuturoDiferenca").innerHTML = (ValorTotalAte6Meses_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalAte6Meses_DiferencaFuturo).toFixed(2) + "€";

			// 6 meses a 1 ano
			// coluna este ano
			document.getElementById("Resultados6meses1Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais6Mesesa1Ano_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados6meses1AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais6Mesesa1Ano_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados6meses1AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano
			document.getElementById("Resultados6meses1Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais6Mesesa1Ano_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados6meses1Ano2019Diferenca").innerHTML = (ValorTotalMais6Mesesa1Ano_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais6Mesesa1Ano_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados6meses1AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais6Mesesa1Ano_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados6meses1AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais6Mesesa1Ano_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados6Meses1AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais6Mesesa1Ano_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados6Meses1AnoFuturoDiferenca").innerHTML = (ValorTotalMais6Mesesa1Ano_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais6Mesesa1Ano_DiferencaFuturo).toFixed(2) + "€";

			// 1 a 2 anos
			// coluna este ano
			document.getElementById("Resultados1Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais1a2Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados1AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais1a2Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados1AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano
			document.getElementById("Resultados1Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais1a2Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados1Ano2019Diferenca").innerHTML = (ValorTotalMais1a2Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais1a2Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados1AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais1a2Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados1AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais1a2Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados1AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais1a2Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados1AnoFuturoDiferenca").innerHTML = (ValorTotalMais1a2Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais1a2Anos_DiferencaFuturo).toFixed(2) + "€";
			
			// coluna este ano
			document.getElementById("Resultados2Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais2a3Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados2AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais2a3Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados2AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano
			document.getElementById("Resultados2Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais2a3Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados2Ano2019Diferenca").innerHTML = (ValorTotalMais2a3Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais2a3Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados2AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais2a3Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados2AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais2a3Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados2AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais2a3Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados2AnoFuturoDiferenca").innerHTML = (ValorTotalMais2a3Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais2a3Anos_DiferencaFuturo).toFixed(2) + "€";
			
			// coluna este ano
			document.getElementById("Resultados3Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais3a4Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados3AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais3a4Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados3AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano
			document.getElementById("Resultados3Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais3a4Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados3Ano2019Diferenca").innerHTML = (ValorTotalMais3a4Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais3a4Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados3AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais3a4Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados3AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais3a4Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados3AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais3a4Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados3AnoFuturoDiferenca").innerHTML = (ValorTotalMais3a4Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais3a4Anos_DiferencaFuturo).toFixed(2) + "€";
			
			// coluna este ano
			document.getElementById("Resultados4Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais4a5Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados4AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais4a5Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados4AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados4Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais4a5Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados4Ano2019Diferenca").innerHTML = (ValorTotalMais4a5Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais4a5Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados4AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais4a5Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados4AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais4a5Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados4AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais4a5Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados4AnoFuturoDiferenca").innerHTML = (ValorTotalMais4a5Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais4a5Anos_DiferencaFuturo).toFixed(2) + "€";
			
			// coluna este ano
			document.getElementById("Resultados5Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais5a6Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados5AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais5a6Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados5AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados5Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais5a6Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados5Ano2019Diferenca").innerHTML = (ValorTotalMais5a6Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais5a6Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados5AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais5a6Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados5AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais5a6Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados5AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais5a6Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados5AnoFuturoDiferenca").innerHTML = (ValorTotalMais5a6Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais5a6Anos_DiferencaFuturo).toFixed(2) + "€";
			
			// coluna este ano
			document.getElementById("Resultados6Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais6a7Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados6AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais6a7Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados6AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados6Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais6a7Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados6Ano2019Diferenca").innerHTML = (ValorTotalMais6a7Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais6a7Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados6AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais6a7Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados6AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais6a7Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados6AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais6a7Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados6AnoFuturoDiferenca").innerHTML = (ValorTotalMais6a7Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais6a7Anos_DiferencaFuturo).toFixed(2) + "€";
			
			// coluna este ano
			document.getElementById("Resultados7Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais7a8Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados7AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais7a8Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados7AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados7Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais7a8Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados7Ano2019Diferenca").innerHTML = (ValorTotalMais7a8Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais7a8Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados7AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais7a8Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados7AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais7a8Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados7AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais7a8Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados7AnoFuturoDiferenca").innerHTML = (ValorTotalMais7a8Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais7a8Anos_DiferencaFuturo).toFixed(2) + "€";
			
			// coluna este ano
			document.getElementById("Resultados8Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais8a9Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados8AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais8a9Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados8AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados8Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais8a9Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados8Ano2019Diferenca").innerHTML = (ValorTotalMais8a9Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais8a9Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados8AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais8a9Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados8AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais8a9Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados8AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais8a9Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados8AnoFuturoDiferenca").innerHTML = (ValorTotalMais8a9Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais8a9Anos_DiferencaFuturo).toFixed(2) + "€";
			
			// coluna este ano
			document.getElementById("Resultados9Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais9a10Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados9AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais9a10Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados9AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados9Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais9a10Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados9Ano2019Diferenca").innerHTML = (ValorTotalMais9a10Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais9a10Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados9AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais9a10Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados9AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais9a10Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados9AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais9a10Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados9AnoFuturoDiferenca").innerHTML = (ValorTotalMais9a10Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais9a10Anos_DiferencaFuturo).toFixed(2) + "€";
			
			// coluna este ano
			document.getElementById("Resultados10Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais10a11Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados10AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais10a11Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados10AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados10Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais10a11Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados10Ano2019Diferenca").innerHTML = (ValorTotalMais10a11Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais10a11Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados10AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais10a11Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados10AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais10a11Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados10AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais10a11Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados10AnoFuturoDiferenca").innerHTML = (ValorTotalMais10a11Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais10a11Anos_DiferencaFuturo).toFixed(2) + "€";

			// coluna este ano
			document.getElementById("Resultados11Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais11a12Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados11AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais11a12Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados11AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados11Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais11a12Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados11Ano2019Diferenca").innerHTML = (ValorTotalMais11a12Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais11a12Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados11AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais11a12Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados11AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais11a12Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados11AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais11a12Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados11AnoFuturoDiferenca").innerHTML = (ValorTotalMais11a12Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais11a12Anos_DiferencaFuturo).toFixed(2) + "€";

			// coluna este ano
			document.getElementById("Resultados12Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais12a13Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados12AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais12a13Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados12AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados12Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais12a13Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados12Ano2019Diferenca").innerHTML = (ValorTotalMais12a13Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais12a13Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados12AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais12a13Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados12AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais12a13Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados12AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais12a13Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados12AnoFuturoDiferenca").innerHTML = (ValorTotalMais12a13Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais12a13Anos_DiferencaFuturo).toFixed(2) + "€";

			// coluna este ano
			document.getElementById("Resultados13Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais13a14Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados13AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais13a14Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados13AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados13Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais13a14Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados13Ano2019Diferenca").innerHTML = (ValorTotalMais13a14Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais13a14Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados13AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais13a14Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados13AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais13a14Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados13AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais13a14Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados13AnoFuturoDiferenca").innerHTML = (ValorTotalMais13a14Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais13a14Anos_DiferencaFuturo).toFixed(2) + "€";

			// coluna este ano
			document.getElementById("Resultados14Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais14a15Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados14AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais14a15Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados14AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados14Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais14a15Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados14Ano2019Diferenca").innerHTML = (ValorTotalMais14a15Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais14a15Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados14AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais14a15Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados14AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais14a15Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados14AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais14a15Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados14AnoFuturoDiferenca").innerHTML = (ValorTotalMais14a15Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais14a15Anos_DiferencaFuturo).toFixed(2) + "€";

			// coluna este ano
			document.getElementById("Resultados15Ano").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais15Anos_EsteAno)).toFixed(2) + "€";
			document.getElementById("Resultados15AnoCilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Mais15Anos_EsteAno).toFixed(2) + "€";
			document.getElementById("Resultados15AnoCO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			// coluna próximo ano			
			document.getElementById("Resultados15Ano2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais15Anos_ProximoAno)).toFixed(2) + "€";
			document.getElementById("Resultados15Ano2019Diferenca").innerHTML = (ValorTotalMais15Anos_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalMais15Anos_DiferencaAnos).toFixed(2) + "€";
			document.getElementById("Resultados15AnoCilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Mais15Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados15AnoCO22019").innerHTML = "CO2 " + Number(ValorISVCO2Mais15Anos_ProximoAno).toFixed(2) + "€";
			document.getElementById("Resultados15AnoFuturo2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalMais15Anos_ProximoAnoFuturo)).toFixed(2) + "€";
			document.getElementById("Resultados15AnoFuturoDiferenca").innerHTML = (ValorTotalMais15Anos_DiferencaFuturo>0?"<span style='color:green'>-":"<span style='color:red'>+") + Number(ValorTotalMais15Anos_DiferencaFuturo).toFixed(2) + "€";			
			
			// coluna este ano
			document.getElementById("ResultadosNaoUE").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalNaoUE_EsteAno)).toFixed(2) + "€";
			document.getElementById("ResultadosNaoUECilindrada").innerHTML = "cm3 " + Number(ValorISVcm3Novo_EsteAno).toFixed(2) + "€";
			document.getElementById("ResultadosNaoUETaxas").innerHTML = "Taxas " + Number(ValorTaxas).toFixed(2) + "€";
			document.getElementById("ResultadosNaoUECO2").innerHTML = "CO2 " + Number(ValorISVCO2_EsteAno).toFixed(2) + "€";
			document.getElementById("ResultadosNaoUEISV").innerHTML = "ISV " + Number(ValorISVNovo_EsteAno).toFixed(2)+"€";	
			document.getElementById("ResultadosNaoUEIVA").innerHTML = "IVA " + Number(ValorIVANaoUE_EsteAno).toFixed(2)+"€";
			// coluna próximo ano
			document.getElementById("ResultadosNaoUE2019").innerHTML = Number(Math.max(ValorISVMinimo,ValorTotalNaoUE_ProximoAno)).toFixed(2) + "€";
			document.getElementById("ResultadosNaoUE2019Diferenca").innerHTML = (ValorTotalNaoUE_DiferencaAnos<0?"<span style='color:green'>":"<span style='color:red'>+") + Number(ValorTotalNaoUE_DiferencaAnos).toFixed(2) + "€</span>";
			document.getElementById("ResultadosNaoUECilindrada2019").innerHTML = "cm3 " + Number(ValorISVcm3Novo_ProximoAno).toFixed(2) + "€";
			document.getElementById("ResultadosNaoUECO22019").innerHTML = "CO2 " + Number(ValorISVCO2_ProximoAno).toFixed(2) + "€";
			document.getElementById("ResultadosNaoUEISV2019").innerHTML = "ISV " + Number(ValorISVNovo_ProximoAno).toFixed(2)+"€";			
			document.getElementById("ResultadosNaoUETaxas2019").innerHTML = "Taxas " + Number(ValorTaxas).toFixed(2) + "€";
			document.getElementById("ResultadosNaoUEIVA2019").innerHTML = "IVA " + Number(ValorIVANaoUE_ProximoAno).toFixed(2)+"€";
			
		} else {
			document.getElementById("Simulador2018SemResultados").style.display = "table";
			document.getElementById("Simulador2018Resultados").style.display = "none";
		};
	};