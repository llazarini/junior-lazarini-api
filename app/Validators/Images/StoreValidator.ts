import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        imageable: schema.string(),
        imageable_id: schema.number.optional(),
        request_token: schema.string.optional(),
        image: schema.file(),
    })

    public messages: CustomMessages = {}
}
