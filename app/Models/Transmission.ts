import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transmission extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public externalId: string

    @column()
    public name: string

    @column()
    public equipmentType: string

    @column()
    public automaticType: string

    @column()
    public availability: string

    @column()
    public transmissionType: string

    @column()
    public numberOfSpeeds: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
