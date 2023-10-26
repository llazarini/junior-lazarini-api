import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.get("/dataprovider", "VehiclesController.dataprovider");
	Route.get("/recent-vehicles", "VehiclesController.recentVehicles");
	Route.get("/vehicle-types", "VehiclesController.vehicleTypes");
	Route.get("/show/:id", "VehiclesController.show");
	Route.get("/similar-vehicles/:id", "VehiclesController.similarVehicles");
	Route.get("/index", "VehiclesController.index");
	
	Route.group(() => {
		Route.post("/store", "VehiclesController.store");
		Route.put("/update", "VehiclesController.update");
		Route.delete("/delete/:id", "VehiclesController.delete");
		Route.put("/sold/:id", "VehiclesController.sold");
	})
	.middleware(['auth'])
})
.prefix("vehicles");
