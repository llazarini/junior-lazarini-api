import { DateTime } from 'luxon'
import { BaseModel, column, computed, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Env from '@ioc:Adonis/Core/Env'
import Model from './Model'

export default class Brand extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public image: string

    @column()
    public position: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @computed()
    public get image_url() {
        if (!this.image) {
            return null;
        }
        return `${Env.get('APP_URL')}/images/get?image=${this.image}`;
    }

    @computed()
    public get original_image_url() {
        if (!this.image) {
            return null;
        }
        return `${Env.get('S3_ENDPOINT')}${Env.get('S3_BUCKET')}/${this.image}`;
    }

    @hasMany(() => Model)
    public models: HasMany<typeof Model>;
}
