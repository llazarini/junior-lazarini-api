import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string([
            rules.alpha(),
            rules.maxLength(128)
        ]),
        brand_id: schema.number([
            rules.exists({ table: 'brands', column: 'id' }),
        ]),
    })

    public messages: CustomMessages = {}
}
