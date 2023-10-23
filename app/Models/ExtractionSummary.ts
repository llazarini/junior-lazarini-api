import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ExtractionSummary extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public source: string

    @column()
    public brandId: number

    @column()
    public modelId: number

    @column()
    public model: string

    @column()
    public brand: string

    @column()
    public modelTotal: number

    @column()
    public brandTotal: number

    @column.dateTime()
    public extractionDate: DateTime

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
