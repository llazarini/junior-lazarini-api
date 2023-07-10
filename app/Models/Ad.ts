import { DateTime } from 'luxon'
import { BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import BaseCompany from './BaseCompany'
import Target from './Target'
import Vehicle from './Vehicle'
import AdIntegration from './AdIntegration'

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

    @belongsTo(() => Target)
    public target: BelongsTo<typeof Target>;

    @belongsTo(() => Vehicle)
    public vehicle: BelongsTo<typeof Vehicle>;

    @hasMany(() => AdIntegration)
    public integrations: HasMany<typeof AdIntegration>;
}
