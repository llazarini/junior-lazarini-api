import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.get("/index", "TargetsController.index");
	Route.post("/store", "TargetsController.store");
	Route.put("/update", "TargetsController.update");
	Route.delete("/delete/:id", "TargetsController.delete");
	Route.get("/show/:id", "TargetsController.show");
	Route.get("/dataprovider", "TargetsController.dataprovider");
})
.middleware(['auth'])
.prefix("targets");

