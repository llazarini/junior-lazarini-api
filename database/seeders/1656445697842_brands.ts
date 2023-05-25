import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Brand from 'App/Models/Brand'

export default class extends BaseSeeder {
    public async run () {

        const brands = [
            { id: 1, name: 'Volkswagen', slug: 'volkswagen', },
            { id: 2, name: 'Opel', slug: 'opel', },
            { id: 3, name: 'Hyundai', slug: 'hyundai', },
            { id: 4, name: 'Toyota', slug: 'toyota', },
            { id: 5, name: 'Ford', slug: 'ford', },
            { id: 6, name: 'Fiat', slug: 'fiat', },
        ]

        await Brand.fetchOrCreateMany('slug', brands);
    }
}
