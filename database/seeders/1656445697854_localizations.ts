import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Country from 'App/Models/Country';
import State from 'App/Models/State';

export default class extends BaseSeeder {
    public async run () {
        const countries = [
            { id: 1, name: 'Portugal', code: 'PT' },
            { id: 2, name: 'Brazil', code: 'BR' },
            { id: 3, name: 'United States', code: 'US' },
            { id: 4, name: 'Canada', code: 'CA' },
        ]

        const states = [
            { id: 1, countryId: 1, name: 'Viseu', code: 'viseu', facebookCode: '' },
            { id: 2, countryId: 1, name: 'Lisboa', code: 'lisboa', facebookCode: '' },
            { id: 3, countryId: 1, name: 'Porto', code: 'porto', facebookCode: '' },

            { id: 4, countryId: 2, name: 'São Paulo', code: 'sao-paulo', facebookCode: '' },
            { id: 5, countryId: 2, name: 'Minas Gerais', code: 'minas-gerais', facebookCode: '' },
            { id: 6, countryId: 2, name: 'Rio de Janeiro', code: 'rio-de-janeiro', facebookCode: '' },
            
            { id: 7, countryId: 3, name: 'New York', code: 'new-york', facebookCode: '' },
            { id: 8, countryId: 3, name: 'Texas', code: 'texas', facebookCode: '' },
            { id: 9, countryId: 3, name: 'California', code: 'california', facebookCode: '' },
        ]

        await Country.fetchOrCreateMany('id', countries);
        await State.fetchOrCreateMany('id', states);
    }
}
