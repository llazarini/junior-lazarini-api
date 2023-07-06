import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.get("/index", "AdsController.index");
	Route.post("/store", "AdsController.store");
	Route.put("/update", "AdsController.update");
	Route.delete("/delete/:id", "AdsController.delete");
	Route.get("/show/:id", "AdsController.show");
	Route.get("/dataprovider", "AdsController.dataprovider");
})
.middleware(['auth'])
.prefix("ads");

