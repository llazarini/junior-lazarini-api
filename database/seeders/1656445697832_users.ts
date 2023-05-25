import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
    public async run () {
        await User.fetchOrCreateMany('id', [
            { id: 1, name: 'Leonardo Lazarini', userTypeId: 1, email: 'llazarini2@gmail.com', password: '1q2w3e4r' },
        ])
    }
}
