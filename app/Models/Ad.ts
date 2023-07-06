import { DateTime } from 'luxon'
import { column } from '@ioc:Adonis/Lucid/Orm'
import BaseCompany from './BaseCompany'

export default class Ad extends BaseCompany {
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

    @column({
        serialize: (value) => typeof value === 'string' ? JSON.parse(value) : value,
		prepare: (value) => JSON.stringify(value),
    })
    public platforms: string

    @column()
    public scheduleDate: Date

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
