import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.group(() => {
		Route.get("/countries", "LocalizationController.countries");
		Route.get("/states", "LocalizationController.states");
	})
	.middleware(['auth'])
})
.prefix("localization");
