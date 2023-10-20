import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Fuel from 'App/Models/Fuel'

export default class extends BaseSeeder {
    public async run () {
        await Fuel.fetchOrCreateMany(
            'slug',
            [
                { name: 'Gasolina', slug: 'gasoline' },
                { name: 'Gasóleo', slug: 'diesel' },
                { name: 'Elétrico', slug: 'eletric' },
                { name: 'Híbrido', slug: 'hybrid' },
                { name: 'Híbrido Plug-in', slug: 'hybrid-plugin' },
                { name: 'GNV', slug: 'gnv' },
            ]
        )
    }
}
