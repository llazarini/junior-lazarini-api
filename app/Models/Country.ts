import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Env from '@ioc:Adonis/Core/Env'

export default class Country extends BaseModel {
    @column({ isPrimary: true })
    public id: number
    
    @column()
    public name: string

    @column()
    public code: string

    @column()
    public countryCode: string

    @column()
    public image: string
    
    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    /**
     * Get the video out URL
     */
    @computed()
    public get image_url() {
        return `${Env.get('S3_URL')}${this.image}`;
    }
    
}
