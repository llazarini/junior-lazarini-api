import User from "App/Models/User";
import UserType from "App/Models/UserType";
import StoreUpdateValidator from "App/Validators/Users/StoreUpdateValidator";
import Company from "App/Models/Company";

export default class UsersController {

	/**
	 * Index
	 * @param param0
	 * @returns
	 */
	public async index({ request, response }) {
		const { search, sort, direction } = request.qs();
		let users: any = User.query()
			.preload("userType");

		if (search) {
			users.whereILike("name", `%${search}%`);
			users.orWhereILike("code", `%${search}%`);
		}
		if (sort === "user_type") {
			users
				.join(
					UserType.table,
					`${UserType.table}.id`,
					`${User.table}.user_type_id`
				)
				.select(`${User.table}.*`)
				.orderBy(`${UserType.table}.name`, direction);
		} else if (sort) {
			if (!direction) {
				users.orderBy(sort, "asc");
			} else {
				users.orderBy(sort, direction);
			}
		}

		users = await users.paginate(request.input("page") || 1);

		return response.json(users);
	}

	/**
	 * Show
	 * @param param0 
	 * @returns 
	 */
	public async show({ request, response }) {
		const user = await User.find(request.param("id"));
		if (!user) {
			return response.json(
				{
					message: "This user ID was not found.",
				},
				400
			);
		}
		return response.json(user);
	}

	/**
	 * DataProvider
	 * @param param0 
	 * @returns 
	 */
	public async dataprovider({ request, response }) {
		const userTypes = await UserType.all();
		const companies = await Company.all();

		return response.json({
			userTypes,
			companies
		});
	}

	/**
	 * Store
	 * @param param0 
	 * @returns 
	 */
	public async store({ request, response }) {
		await request.validate(StoreUpdateValidator);

		const user = new User();
		user.fill(request.all());
		user.active = false;

		if (!(await user.save())) {
			return response.badRequest({
				message: "An error occurred when trying to save the register.",
			});
		}

		return {
			message: "The user was successfully saved.",
		};
	}

	/**
	 * Updates all possible variables for a user and requires all fields
	 * @param param0
	 * @returns Updated user to the client
	 */
	public async update({ request, response }) {
		await request.validate(StoreUpdateValidator);
		const user = await User.find(request.input("id"));
		if (!user) {
			return response.badRequest({
				message: "The user was not found.",
			});
		}

		user.merge(request.all());

		if (!(await user.save())) {
			return response.badRequest({
				message: "An error occurred when trying to save the register.",
			});
		}

		return {
			message: "The user was successfully saved.",
		};
	}

	/**
	 * Delete function
	 * @param param0
	 * @returns Message of error or  success to the user
	 */
	public async delete({ request, response, auth }) {
		const { id } = request.qs();
		const userType = await UserType.find(auth.user.userTypeId);

		if (userType?.slug !== "admin" && userType?.slug !== "super-admin") {
			return response.badRequest({
				message: "Only super admin and admin has access to delete user",
			});
		}

		const user = await User.find(id);
		if (!user) {
			return response.badRequest({
				message: "The user was not found.",
			});
		}

		await user.delete();
		return {
			message: "The user was successfully deleted.",
		};
	}
}
