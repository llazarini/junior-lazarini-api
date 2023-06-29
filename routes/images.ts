import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.get("/image", "ImagesController.image");
	Route.get("/images", "ImagesController.images");

	Route
		.group(() => {
			Route.post("/store", "ImagesController.store");
			Route.put("/update", "ImagesController.update");
			Route.delete("/delete/:id", "ImagesController.delete");
		})
		.middleware(['auth'])
})
.prefix("images");
