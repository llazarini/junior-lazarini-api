import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.get("/index", "TargetController.index");
	Route.post("/store", "TargetController.store");
	Route.put("/update", "TargetController.update");
	Route.delete("/delete/:id", "TargetController.delete");
	Route.get("/show/:id", "TargetController.show");
})
.middleware(['auth'])
.prefix("targets");

