import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        brand_id: schema.number([
            rules.exists({ table: "brands", column: "id" }),
        ]),
        model_id: schema.number([
            rules.exists({ table: "models", column: "id" }),
        ]),
        vehicle_type_id: schema.number([
            rules.exists({ table: "vehicle_types", column: "id" }),
        ]),
        price: schema.number(),
        mileage: schema.number(),
        year: schema.number(),
        vin: schema.string(),
        transmission: schema.string(),
        version: schema.string(),
    })

    public messages: CustomMessages = {}
}
