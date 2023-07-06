import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
    constructor(protected ctx: HttpContextContract) {}

    public refs = schema.refs({
        id: this.ctx.request.input('id'),
    })

    public schema = schema.create({
        id: schema.number.optional([
            rules.exists({ table: "ads", column: "id" }),
        ]),
        link: schema.string([
            rules.maxLength(128)
        ]),
        title: schema.string([
            rules.maxLength(128)
        ]),
        platforms: schema.array().members(schema.string()),
        target_id: schema.number([
            rules.exists({ table: 'targets', column: 'id' })
        ]),
        vehicle_id: schema.number([
            rules.exists({ table: 'vehicles', column: 'id' })
        ]),
        schedule_date: schema.date.optional()
    })

    public messages: CustomMessages = {}
}
