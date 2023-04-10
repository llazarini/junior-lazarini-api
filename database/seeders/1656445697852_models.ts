import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Brand from 'App/Models/Brand'
import Model from 'App/Models/Model';
import axios from 'axios'

export default class extends BaseSeeder {
    public async run () {
        const cars = await axios.get(`https://private-anon-5d35bd8737-carsapi1.apiary-mock.com/cars`)
        const brands = await Brand.all();

        const models = cars.data.map((car) => {
            const brand = brands.find(item => item.slug === car.make)
            return {
                name: car.model,
                brand_id: brand?.id,
            }
        });

        await Model.fetchOrCreateMany('name', models);
    }
}
