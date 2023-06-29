import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Social } from 'App/Services/Social/Social'
import Application from '@ioc:Adonis/Core/Application'

export default class SocialController {

    public async post({ request, response }: HttpContextContract) { 
        const social = new Social({
            facebook: { 
                accessToken: 'EAADZCyr5K448BACs5IFX9MW7DFKKxKIRs3ZB4ERs2I5TZATvZB1yxCMtlRkykHcTn0g5PwaCXfoZAT1zwZAbZC65E9zrRdxe3wfsLxQB8uLPN07aEZB4d9QZAqB3D5ScZBXgZCYE7LdxVrLUOL5WQrJjanxYgRPFX9ZAXuZBeAmzwRQpeK2tWlD8UfnUqR9m1ehHqwWAZD',
                clientSecret: '55dea9b16495144fff332714a79b66ee',
                clientId: '281246241055631',
                accountId: 'act_415509278537487',
                pageId: '101925319621368',

                // 415509278537487 - ad account id
            }
        });

        //social.set('campaignId', '6338571200200');
        //social.set('adSetId', '6338592304800');

        await social.post({
            post: 'Testando a integração com o facebook',
            platforms: ['facebook'],
            link: 'https://juniorlazarini.pt/contact',
            mediaUrls: [
                `${Application.tmpPath()}/uploads/assets/test.png`
            ],
            scheduleDate: null,
            targeting: {
                minAge: 18,
                maxAge: 45,
                countries: ['PT'],
                // interests: ['travel']
            }
        })
    }
}
