import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string([
            rules.alpha(),
            rules.maxLength(128)
        ]),
        min_age: schema.number([
            rules.range(18, 100)
        ]),
        max_age: schema.number([
            rules.range(18, 100)
        ]),
    })

    public messages: CustomMessages = {}
}
