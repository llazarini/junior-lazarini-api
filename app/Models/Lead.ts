import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Country from './Country'

export default class Lead extends compose(BaseModel, SoftDeletes) {
    @column({ isPrimary: true })
    public id: number

    @column()
    public companyId: number

    @column()
    public countryId: number

    @column()
    public name: string

    @column()
    public email: string

    @column()
    public phone: string

    @column()
    public description: string

    @column()
    public importAs: string

    @column()
    public interestedIn: string

    @column()
    public comments: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Country)
    public country: BelongsTo<typeof Country>;
}
