import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string([
            rules.maxLength(128)
        ]),
        slug: schema.string([
            rules.unique({ table: "brands", column: "slug" }),
            rules.maxLength(128)
        ]),
    })

    public messages: CustomMessages = {}
}
