import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string([
            rules.maxLength(128)
        ]),
        min_age: schema.number([
            rules.range(18, 100)
        ]),
        max_age: schema.number([
            rules.range(18, 100)
        ]),
        country_id: schema.number([
            rules.exists({ table: 'countries', column: 'id' })
        ]),
        states: schema.array().members(schema.number([
            rules.exists({ table: 'states', column: 'id' })
        ])),
        interests: schema.array().members(schema.number([
            rules.exists({ table: 'interests', column: 'id' })
        ])),
    })

    public messages: CustomMessages = {}
}
