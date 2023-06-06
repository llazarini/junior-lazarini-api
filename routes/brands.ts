import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.group(() => {
		Route.get("/index", "BrandsController.index");
		Route.post("/store", "BrandsController.store");
		Route.put("/update", "BrandsController.update");
		Route.delete("/delete/:id", "BrandsController.delete");
	}).middleware(['auth'])
}).prefix("brands");
