import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Extraction extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public source: string

    @column()
    public extractionHash: string

    @column()
    public status: string

    @column()
    public extractionFailed: number

    @column()
    public extractionSucceeded: number

    @column()
    public extractionTotal: number

    @column.dateTime({ autoCreate: true })
    public extractionDate: DateTime

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
