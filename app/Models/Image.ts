import { DateTime } from 'luxon'
import { column, computed } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Env from '@ioc:Adonis/Core/Env'
import BaseCompany from './BaseCompany'


export default class Image extends compose(BaseCompany, SoftDeletes) {
    @column({ isPrimary: true })
    public id: number

    @column()
    public imageableId: number

    @column()
    public imageable: string

    @column()
    public drive: string

    @column()
    public requestToken: string

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

    /**
     * Get the video out URL
     */
    @computed()
    public get image_resized() {
        return `${Env.get('APP_URL')}/images/image?url=${this.path}`;
    }
}
