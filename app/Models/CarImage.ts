import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Env from '@ioc:Adonis/Core/Env'

export default class CarImage extends compose(BaseModel, SoftDeletes) {
    @column({ isPrimary: true })
    public id: number

    @column()
    public carId: number

    @column()
    public type: string

    @column()
    public url: string

    @column()
    public urlPreview: string

    @column()
    public position: number

    @column()
    public mlApproved: boolean
    
    @column()
    public mlSaved: boolean

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    /**
     * Get the video out URL
     */
    @computed()
    public get computed_preview() {
        if (!this.url) {
            return '';
        }
        return `${Env.get('APP_URL')}/images/preview/${this.id}`;
    }
     
}
