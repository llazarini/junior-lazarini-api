import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Interest from 'App/Models/Interest';

export default class extends BaseSeeder {
    public async run () {
        const interests = [
            { id: 1, name: 'Technology', facebookCode: 'technology' },
            { id: 2, name: 'Video games', facebookCode: 'video-games' },
            { id: 3, name: 'Comics', facebookCode: 'comics' },
        ]

        await Interest.fetchOrCreateMany('name', interests);
    }
}
