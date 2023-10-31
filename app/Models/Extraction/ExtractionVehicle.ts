import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ExtractionVehicle extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public source: string

    @column()
    public extractionId: number

    @column()
    public extractionHash: string

    @column()
    public fuelId: number

    @column()
    public location: string

    @column()
    public locationState: string

    @column()
    public locationLat: number

    @column()
    public locationLng: number

    @column()
    public brandId: number

    @column()
    public modelId: number

    @column()
    public link: string

    @column()
    public version: string

    @column()
    public fuelType: string

    @column()
    public brandDescription: string

    @column()
    public modelDescription: string

    @column()
    public year: number

    @column()
    public firstRegistrationYear: number

    @column()
    public price: number

    @column()
    public transmission: string

    @column()
    public featuredImage: string

    @column()
    public mileage: number

    @column()
    public detailsExtractionComplete: boolean

    @column()
    public enginePower: string

    @column()
    public engineCylinderCapacity: string

    @column.dateTime({ autoCreate: true })
    public extractionDate: DateTime

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
