import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.get("/dataprovider", "SimulatorController.dataprovider");
	Route.post("/simulate", "SimulatorController.simulate");
	Route.get("/crawler", "SimulatorController.crawler");
}).prefix("simulator");
