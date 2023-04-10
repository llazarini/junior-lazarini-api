import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
    public async run () {
        await User.fetchOrCreateMany('id', [
            { id: 1, name: 'Administrator', userTypeId: 1, email: 'admin@marketplaceauto.pt', password: '1q2w3e4r' },
            { id: 2, name: 'Test Client', userTypeId: 2, email: 'client@marketplaceauto.pt', password: '1q2w3e4r' },
        ])
    }
}
