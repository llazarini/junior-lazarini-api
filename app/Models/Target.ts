import { DateTime } from 'luxon'
import { BelongsTo, HasManyThrough, belongsTo, column, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import State from './State'
import TargetState from './TargetState'
import Interest from './Interest'
import TargetInterest from './TargetInterest'
import Country from './Country'
import BaseCompany from './BaseCompany'

export default class Target extends BaseCompany {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public minAge: number

    @column()
    public maxAge: number

    @column()
    public countryId: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Country)
    public country: BelongsTo<typeof Country>;

    @hasManyThrough([() => State, () => TargetState], { throughForeignKey: 'id', throughLocalKey: 'stateId' })
    public states: HasManyThrough<typeof State>;

    @hasManyThrough([() => Interest, () => TargetInterest], { throughForeignKey: 'id', throughLocalKey: 'interestId' })
    public interests: HasManyThrough<typeof Interest>;
}
