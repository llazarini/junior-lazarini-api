import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.get("/dataprovider", "VehiclesController.dataprovider");
	Route.get("/recent-vehicles", "VehiclesController.recentVehicles");
	Route.get("/index", "VehiclesController.index");
	Route.get("/vehicle-types", "VehiclesController.vehicleTypes");
	Route.get("/show/:id", "VehiclesController.show");
	Route.get("/similar-vehicles/:id", "VehiclesController.similarVehicles");
	Route.post("/store", "VehiclesController.store");
	Route.put("/update", "VehiclesController.update");
}).prefix("vehicles");
