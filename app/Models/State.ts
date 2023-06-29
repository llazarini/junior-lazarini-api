import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Country from './Country'

export default class State extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public countryId: number

    @column()
    public name: string

    @column()
    public code: string

    @column()
    public facebookCode: string
    
    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Country)
    public country: BelongsTo<typeof Country>;
}
