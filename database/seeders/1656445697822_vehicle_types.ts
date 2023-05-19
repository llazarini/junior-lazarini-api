import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import VehicleType from 'App/Models/VehicleType'

export default class extends BaseSeeder {
    public async run () {
        // Cabrio, Carrinha, Citadino, Coupé, Monovolume, Pequeno citadino, Sedan, SUV/ TT, Utilirário
        await VehicleType.fetchOrCreateMany('slug', [
            { name: 'Cabrio', slug: 'cabrio' },
            { name: 'Carrinha', slug: 'carrinha' },
            { name: 'Citadino', slug: 'citadino' },
            { name: 'Coupé', slug: 'coupe' },
            { name: 'Monovolume', slug: 'monovolume' },
            { name: 'Pequeno citadino', slug: 'pequeno_citadino' },
            { name: 'Sedan', slug: 'sedan' },
            { name: 'SUV', slug: 'suv' },
            { name: 'Utilitário', slug: 'utilitario' },
        ])
    }
}
