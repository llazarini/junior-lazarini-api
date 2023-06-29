import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
    constructor(protected ctx: HttpContextContract) {}

    public refs = schema.refs({
        id: this.ctx.request.input('id'),
    })

    public schema = schema.create({
        id: schema.number.optional([
            rules.exists({ table: "brands", column: "id" }),
        ]),
        name: schema.string([
            rules.alpha(),
            rules.maxLength(128)
        ]),
        slug: schema.string([
            rules.unique({ table: "brands", column: "slug", whereNot: { id: this.refs.id, } }),
            rules.maxLength(128)
        ]),
    })

    public messages: CustomMessages = {}
}
