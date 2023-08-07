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
        country_id: schema.number.optional([
            rules.exists({ table: "countries", column: "id" }),
        ]),
        name: schema.string([
            rules.alpha({ allow: ['space'] }),
            rules.maxLength(128)
        ]),
        email: schema.string([
            //rules.unique({ table: "leads", column: "email" }),
            rules.email(),
            rules.maxLength(128)
        ]),
        phone: schema.string.optional([
            //rules.unique({ table: "leads", column: "phone" }),
            rules.minLength(4),
            rules.maxLength(13),
        ]),
        description: schema.string.optional([
            rules.maxLength(256),
        ]),
        comments: schema.string.optional([
            rules.maxLength(2048),
        ]),
        interested_in: schema.string([
            rules.maxLength(128)
        ]),
        import_as: schema.string.optional([
            rules.maxLength(128),
        ]),
    })

    public messages: CustomMessages = {}
}
