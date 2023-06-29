import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateUserValidator {
	constructor(protected ctx: HttpContextContract) {
		console.log(this.ctx.request.input('id'))
	}

	public refs = schema.refs({
		id: this.ctx.request.input('id')
	})

	public schema = schema.create({
		user_type_id: schema.number([
			rules.exists({
				table: 'user_types',
				column: 'id'
			})
		]),
		name: schema.string(),
		code: schema.string([
			rules.minLength(6),
			rules.maxLength(6),
			rules.unique({
				table: 'users',
				column: 'code',
				...this.refs.id ? { whereNot: { id: this.refs.id }, where: { deleted_at: null } } : undefined
			})
		]),
		email: schema.string([
			rules.email(),
			rules.unique({
				table: 'users',
				column: 'email',
				...this.refs.id ? { whereNot: { id: this.refs.id }, where: { deleted_at: null } } : undefined
			})
		]),
		phone: schema.string.optional([rules.mobile()]),
		store_id: schema.number.optional([rules.exists({ table: "stores", column: "id" })]),
		password: schema.string.optional([
			rules.minLength(6),
			rules.maxLength(12),
		]),
		active: schema.boolean.optional()
	});
	public messages: CustomMessages = {};
}
