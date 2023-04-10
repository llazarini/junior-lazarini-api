import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserType from 'App/Models/UserType'

export default class extends BaseSeeder {
    public async run () {
        await UserType.fetchOrCreateMany('slug', [
            { name: 'Administrator', slug: 'admin' },
            { name: 'Client', slug: 'client' },
        ])
    }
}
