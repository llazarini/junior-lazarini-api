import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Env from '@ioc:Adonis/Core/Env'
import Drive from '@ioc:Adonis/Core/Drive'


export default class Image extends compose(BaseModel, SoftDeletes) {
    @column({ isPrimary: true })
    public id: number

    @column()
    public imageableId: number

    @column()
    public imageable: string

    @column()
    public drive: string

    @column()
    public path: string

    @column()
    public fileType: string

    @column()
    public extension: string

    @column()
    public size: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    /**
     * Get the video out URL
     */
    @computed()
    public get image_url() {
        return `${Env.get('S3_URL')}${this.path}`;
    }
     
}
