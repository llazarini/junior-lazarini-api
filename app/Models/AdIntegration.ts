import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AdIntegration extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public integrationId: number

    @column()
    public adId: number

    @column()
    public referenceId: string

    @column()
    public additionalData: string

    @column()
    public integrated: boolean

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
