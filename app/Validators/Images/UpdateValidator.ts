import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
    constructor(protected ctx: HttpContextContract) {}

    public refs = schema.refs({
        id: this.ctx.request.input('id'),
    })

    public schema = schema.create({
        id: schema.number.optional([
            rules.exists({ table: "vehicles", column: "id" }),
        ]),
        imageable: schema.string(),
        imageable_id: schema.number(),
        image: schema.file(),
    })

    public messages: CustomMessages = {}
}
