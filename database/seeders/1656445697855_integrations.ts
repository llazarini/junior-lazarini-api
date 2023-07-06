import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Integration from 'App/Models/Integration';

export default class extends BaseSeeder {
    public async run () {
        const integrations = [
            { id: 1, name: 'Facebook', slug: 'facebook' },
            { id: 2, name: 'Instagram', slug: 'instagram' },
            { id: 3, name: 'OLX', slug: 'olx' },
            { id: 4, name: 'Stand Virtual', slug: 'stand_virtual' },
        ]

        await Integration.fetchOrCreateMany('id', integrations);
    }
}
