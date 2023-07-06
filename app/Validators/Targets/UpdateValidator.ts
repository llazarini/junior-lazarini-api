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
