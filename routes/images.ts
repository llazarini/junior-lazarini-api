import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.post("/store", "ImagesController.store");
	Route.put("/update", "ImagesController.update");
}).prefix("images");
