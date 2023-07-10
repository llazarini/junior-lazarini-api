import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ad from 'App/Models/Ad';
import Target from 'App/Models/Target';
import StoreValidator from 'App/Validators/Ads/StoreValidator';
import UpdateValidator from 'App/Validators/Ads/UpdateValidator';
import { RequestContract } from '@ioc:Adonis/Core/Request';
import Integration from 'App/Models/Integration';
import AdIntegration from 'App/Models/AdIntegration';
import Bull from '@ioc:Rocketseat/Bull';
import CreateFacebookPost from 'App/Jobs/CreateFacebookPost';

export default class AdsController {

    public async index({ request, response }: HttpContextContract) { 
        const { search } = request.qs();
        
        const ads = await Ad
            .query()
            .preload('target')
            .preload('integrations', (query) => {
                query.preload('integration')
            })
            .preload('vehicle', (query) => {
                query.preload('model')
                query.preload('brand')
            })
            .paginate(request.input('page'), 10);
    
        return ads;
    }

    public async update({ request, response }: HttpContextContract) {
        await request.validate(UpdateValidator);
        
        const ad = await Ad.find(request.input('id'));
        ad?.merge(request.all());

        if (!ad || !await ad.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }

        return {
            message: "Success when saving the register."
        }
    }

    public async show({ request, response }: HttpContextContract) {
        const model = await Ad
            .query()
            .where('id', request.param('id'))
            .first();
        
        if (!model) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }
        return model;
    }

    public async store({ request, response }: HttpContextContract) {
        await request.validate(StoreValidator);
        
        const ad = new Ad();
        ad.merge(request.all());
        ad.scheduleDate = new Date();
        if (!await ad.save()) {
            return response.badRequest({
                message: "Error when trying to save the register."
            })
        }

        await this.createIntegrations(ad, request);

    
        return {
            message: "Success when saving the register."
        }
    }
    
    /** 
     * Create integrations
     */
    private async createIntegrations(ad: Ad, request: RequestContract) {
        await AdIntegration
            .query()
            .where('ad_id', ad.id)
            .delete()

        const platforms = request.input('platforms');
        await Promise.allSettled(
            platforms.map(async (platform) => {
                const integration = await Integration.findBy('slug', platform);
                if (!integration) {
                    throw new Error('Integration not found');
                }

                const adIntegration = await AdIntegration.create({
                    adId: ad.id,
                    integrationId: integration?.id,
                    integrated: false,
                })

                if (integration.slug === 'facebook') {
                    Bull.add(new CreateFacebookPost().key, { adIntegration })
                }
            })
        )
    }

    public async dataprovider() {
        const targets = await Target.all();
        const platforms = [
            { name: 'Facebook', slug: 'facebook' },
            { name: 'Instagram', slug: 'instagram' },
        ]
        return { targets, platforms }
    }

    public async delete({ request, response, auth }: HttpContextContract) {
        const id = request.param('id');

        await AdIntegration
            .query()
            .where('ad_id', id)
            .delete();

        const ad = await Ad.find(id);
        await ad?.delete();
        return {
            message: 'Ad successfully removed.'
        }
    }
}
