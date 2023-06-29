import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.post("/post", "SocialController.post");
})
.prefix("social")
.middleware(['auth']);
