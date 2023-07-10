import { JobContract } from '@ioc:Rocketseat/Bull'
import Application from '@ioc:Adonis/Core/Application'
import AdIntegration from 'App/Models/AdIntegration';
import Ad from 'App/Models/Ad';
import { Facebook } from 'App/Services/Social/integrations/Facebook';

export default class CreateFacebookPost implements JobContract {
    public key = 'CreateFacebookPost'

    public async handle(job) {
        const { data } = job;

        const ad = await Ad
            .query() 
            .preload('target', (query) => {
                query.preload('country')
            })
            .where('id', data.adIntegration.ad_id)
            .first();

        if (!ad) {
            throw new Error();
        }

        const adIntegration = await AdIntegration.find(data.adIntegration.id)
        if (!adIntegration) {
            throw new Error();
        }

        await this.post({ ad, adIntegration });
    }

    async post({ ad, adIntegration }: { ad: Ad, adIntegration: AdIntegration }) {
        const facebook = new Facebook({ 
            accessToken: 'EAADZCyr5K448BAIDGvZCdlrKxv2KOpEKElygpeIZBGByp3BVS340l2sGt5ZA4yqxSifCYezr3tc6fgKnGKkHivZABhkD28zVSUvTHZBMfbuplf7e0hBugN02ZBAWNNW1erVZA6V8V5cZCMSYjLd6YadKvDJFJh7igxiNVNOZAt7uEt5x3QvMueTWmE8jTgUyh0ZA19zrr1JW4EGweOTwmxvo4TMX4M87TpCncIZD',
            clientSecret: '55dea9b16495144fff332714a79b66ee',
            clientId: '281246241055631',
            accountId: 'act_415509278537487',
            pageId: '101925319621368',
        })
        
        console.log({
            post: ad.title,
            platforms: ['facebook'],
            link: ad.link,
            mediaUrls: [
                `${Application.tmpPath()}/uploads/assets/test.png`
            ],
            scheduleDate: null,
            targeting: {
                minAge: ad.target.minAge,
                maxAge:  ad.target.maxAge,
                countries: [ad.target.country.code],
                // interests: ['travel']
            }
        })
        
        const response = await facebook.post({
            post: ad.title,
            platforms: ['facebook'],
            link: ad.link,
            mediaUrls: [
                `${Application.tmpPath()}/uploads/assets/test.png`
            ],
            scheduleDate: null,
            targeting: {
                minAge: ad.target.minAge,
                maxAge:  ad.target.maxAge,
                countries: [ad.target.country.code],
                // interests: ['travel']
            }
        });

        if (!response.adId) {
            throw new Error(`Failed to integrate with Facebook`);
        }

        adIntegration.referenceId = response.adId;
        adIntegration.integrated = !!response.adId;
        adIntegration.additionalData = response;
        await adIntegration.save();
    }
}
