import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.post("/isv", "SimulatorController.isv");
}).prefix("simulator");
