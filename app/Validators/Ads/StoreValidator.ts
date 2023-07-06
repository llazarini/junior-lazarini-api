import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
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
