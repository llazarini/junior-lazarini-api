import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.group(() => {
		Route.get("/index", "ModelsController.index");
		Route.post("/store", "ModelsController.store");
		Route.put("/update", "ModelsController.update");
		Route.delete("/delete/:id", "ModelsController.delete");
	}).middleware(['auth'])
}).prefix("models");
