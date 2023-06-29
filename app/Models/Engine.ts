import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Engine extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string
    
    @column()
    public equipmentType: string

    @column()
    public availability: string
    
    @column()
    public compressionRatio: number

    @column()
    public manufacturerEngineCode: string
    
    @column()
    public cylinder: number
    
    @column()
    public size: number
    
    @column()
    public displacement: number
    
    @column()
    public configuration: string
    
    @column()
    public fuelType: string
    
    @column()
    public horsepower: number
    
    @column()
    public torque: number
    
    @column()
    public totalValves: number
    
    @column()
    public type: string
    
    @column()
    public code: string
    
    @column()
    public compressorType: string
    
    @column()
    public rpm: object
    
    @column()
    public valve: object

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
