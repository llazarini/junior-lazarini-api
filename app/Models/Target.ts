import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Target extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public minAge: number

    @column()
    public maxAge: number

    @column({ 
		serialize: (value) => typeof value === 'string' ? JSON.parse(value) : value,
		prepare: (value) => JSON.stringify(value),
	})
    public countries: object

    @column({ 
		serialize: (value) => typeof value === 'string' ? JSON.parse(value) : value,
		prepare: (value) => JSON.stringify(value),
	})
    public regions: object

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
