import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.get("/index", "ModelsController.index");
	Route.post("/store", "ModelsController.store");
	Route.put("/update", "ModelsController.update");
	Route.delete("/delete/:id", "ModelsController.delete");
	Route.get("/show/:id", "ModelsController.show");
	Route.get("/dataprovider", "ModelsController.dataprovider");
})
.prefix("models")
.middleware(['auth']);
