import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Ad extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public companyId: number

    @column()
    public vehicleId: number

    @column()
    public targetId: number

    @column()
    public title: string

    @column()
    public link: string

    @column()
    public platforms: string

    @column()
    public scheduleDate: DateTime

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
