import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Brand from 'App/Models/Brand'
import axios from 'axios'

export default class extends BaseSeeder {
    public async run () {
        const manufacturers = await axios.get(`https://private-anon-5d35bd8737-carsapi1.apiary-mock.com/manufacturers`)

        const brands = manufacturers.data.map(brand => {
            return {
                id: brand.id,
                name: brand.name,
                slug: brand.name,
            }
        });

        await Brand.fetchOrCreateMany('slug', brands);
    }
}
