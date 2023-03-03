import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Brand from './Brand'

export default class Model extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public brandId: number

    @column()
    public name: string

    @column()
    public imageUrl: string

    @column()
    public position: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Brand)
    public brand: BelongsTo<typeof Brand>;
}
