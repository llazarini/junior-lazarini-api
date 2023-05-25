import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Model from 'App/Models/Model';

export default class extends BaseSeeder {
    public async run () {
        const models = [
            // Volkswagen
            { id: 1, brandId: 1, name: 'Golf', },

            // Opel
            { id: 2, brandId: 2, name: 'Astra', },

            // Hyundai
            { id: 3, brandId: 3, name: 'i10', },
        ]

        await Model.fetchOrCreateMany('name', models);
    }
}
