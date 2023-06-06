import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.post("/store", "ImagesController.store");
	Route.put("/update", "ImagesController.update");
	Route.get("/image", "ImagesController.image");
	Route.get("/images", "ImagesController.images");
	Route.delete("/delete/:id", "ImagesController.delete");
}).prefix("images");
