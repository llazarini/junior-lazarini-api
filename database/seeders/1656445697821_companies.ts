import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Company from 'App/Models/Company'
export default class extends BaseSeeder {
    public async run () {
        await Company.fetchOrCreateMany('slug', [
            { name: 'Junior Lazarini', slug: 'junior_lazarini' },
        ])
    }
}
