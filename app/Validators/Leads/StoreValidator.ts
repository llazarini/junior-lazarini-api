import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public refs = schema.refs({
        id: this.ctx.request.input('id'),
    })

    public schema = schema.create({
        id: schema.number.optional([
            rules.exists({ table: "leads", column: "id" }),
        ]),
        name: schema.string([
            rules.alpha(),
            rules.maxLength(128)
        ]),
        email: schema.string([
            rules.unique({ table: "leads", column: "email" }),
            rules.email(),
            rules.maxLength(128)
        ]),
        phone: schema.string([
            rules.unique({ table: "leads", column: "phone" }),
            rules.mobile(),
        ]),
    })

    public messages: CustomMessages = {}
}
