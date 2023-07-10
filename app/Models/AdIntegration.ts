import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Integration from './Integration'

export default class AdIntegration extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public integrationId: number

    @column()
    public adId: number

    @column()
    public referenceId: string

    @column({
        serialize: (value) => typeof value === 'string' ? JSON.parse(value) : value,
		prepare: (value) => JSON.stringify(value),
    })
    public additionalData: any

    @column()
    public integrated: boolean

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Integration)
    public integration: BelongsTo<typeof Integration>;
}
