import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.group(() => {
		Route.get("/index", "LeadsController.index");
		Route.get("/show/:id", "LeadsController.show");
	}).middleware(['auth'])
	Route.post("/store", "LeadsController.store");
	Route.put("/update", "LeadsController.update");
})
.prefix("leads");
