import axios, { AxiosResponse } from "axios";
import { FacebookKeys, Integration, Post, Targeting } from "../Interfaces";
import fs from 'fs';

export class Facebook implements Integration {
    private version: string = 'v17.0';

    private configs: FacebookKeys;
    private accessToken: string;
    private pageId: string;
    private accountId: string;
  
    constructor(configs: FacebookKeys) {
        this.configs = configs;
        this.accessToken = configs.accessToken;
        this.pageId = configs.pageId;
        this.accountId = configs.accountId;
    }

    public set(config: string, value: any) {
        this.configs[config] = value;
    }

    public async post(post: Post) {
        const targeting = this.getTargeting(post.targeting)

        // Get or create campaign ID
        const campaignId = this.configs.campaignId || await this.createAdCampaign();
        if (!campaignId) {
            return false;
        }
        const adSetId = this.configs.adSetId || await this.createAdSet({ targeting, campaignId });
        if (!adSetId) {
            return false;
        }
        const adCreativeId = await this.createAdCreative(post);
        if (!adCreativeId) {
            return false;
        }
        const adId = await this.createAd(post, adCreativeId, adSetId)
        console.log(post.mediaUrls[0], campaignId, adSetId);
    }

    public async delete(id: string) {

    }

    public getTargeting(targeting: Targeting): any {
        const facebookTargeting = {
            age_min: targeting?.minAge,
            age_max: targeting?.maxAge,
            interests: targeting?.interests,
            geo_locations: {
                countries: targeting?.countries,
            }
        };
    
        return facebookTargeting;
    }

    public async createAdImage(imageUrl: string): Promise<string | null> {
        const file = fs.readFileSync(imageUrl, {encoding: 'base64'});
        try {
            const response: AxiosResponse = await axios.post(
                `https://graph.facebook.com/${this.version}/${this.accountId}/adimages`,
                {
                    bytes: file,
                    access_token: this.accessToken
                }
            );

            if (response.status === 200) {
                const imageHash: string = response.data.images.bytes.hash;
                return imageHash;
            }
        } catch (error) {
            console.log(error.response)
            console.error('Failed to upload image:', error.message);
        }
        return null;
    }

    public async createAdCampaign(): Promise<string | null> {
        try {
            const response: AxiosResponse = await axios.post(
                `https://graph.facebook.com/${this.version}/${this.accountId}/campaigns`,
                {
                    access_token: this.accessToken,
                    name: 'Minha campanha',
                    objective: 'OUTCOME_TRAFFIC',
                    status: 'PAUSED',
                    special_ad_categories: '[]',
                }
            );

            if (response.status === 200) {
                const id: string = response.data.id;
                return id;
            } else {
                console.error(response.data)
                throw new Error(response.data.error);
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async createAdSet({ targeting, campaignId }: AdsetParam): Promise<string | null> {
        try {
            const response: AxiosResponse = await axios.post(
                `https://graph.facebook.com/${this.version}/${this.accountId}/adsets`,
                {
                    campaign_id: campaignId,
                    targeting,
                    access_token: this.accessToken,
                    name: 'Vehicles Adset',
                    optimization_goal: 'REACH',
                    billing_event: 'IMPRESSIONS', // APP_INSTALLS, CLICKS, IMPRESSIONS, LINK_CLICKS, NONE, OFFER_CLAIMS, PAGE_LIKES, POST_ENGAGEMENT, THRUPLAY, PURCHASE, LISTING_INTERACTION
                    status: 'PAUSED',
                    bid_amount: 10,
                    daily_budget: 1000,
                    // lifetime_budget: 100
                }
            );

            console.log(response);
        
            if (response.status === 200) {
                const adSetId: string = response.data.id;
                console.log('Ad set created successfully:', adSetId);
                return adSetId;
            } else {
                throw new Error(response.data.error);
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    public async createAdCreative(post: Post): Promise<string | null> {
        const hash = await this.createAdImage(post.mediaUrls[0]);
        console.log(hash);

        try {
            const response: AxiosResponse = await axios.post(
                `https://graph.facebook.com/${this.version}/${this.accountId}/adcreatives`,
                {
                    object_story_spec: {
                        page_id: this.pageId,
                        link_data: {
                            image_hash: hash,
                            message: post.callToAction || 'Clique aqui',
                            link: post.link
                        }
                    },
                    degrees_of_freedom_spec: {
                        creative_features_spec: {
                            standard_enhancements: {
                                enroll_status: "OPT_IN"
                            }
                        }
                    },
                    access_token: this.accessToken
                }
            );

            if (response.status === 200) {
                const adCreativeId: string = response.data.id;
                console.log('Ad creative created successfully:', adCreativeId);
                return adCreativeId;
            } else {
                console.error('Failed to create ad creative:', response.data);
            }
        } catch (error) {
            console.error(error.response)
            console.error('Failed to create ad creative:', error.message);
        }

        return null;
    }
  
    public async createAd(post:Post, adCreativeId: string, adSetId: string): Promise<number | null> 
    {
        try {
            const response: AxiosResponse = await axios.post(
                `https://graph.facebook.com/${this.version}/${this.accountId}/ads`,
                {
                    adset_id: adSetId,
                    creative: { 
                        creative_id: adCreativeId 
                    },
                    access_token: this.accessToken,
                    status: 'PAUSED',
                    name: post.post,
                }
            );
            console.log(response);
    
            if (response.status === 200) {
                return response.data.id;
            } else {
                console.error('Failed to create ad:', response.data.error);
            }
        } catch (error) {
            console.error(error.response)
            console.error('Failed to create ad:', error.message);
        }
        return null;
    }
  
    public async deleteAd(adId: string): Promise<string | null> {
        try {
            const response: AxiosResponse = await axios.delete(
            `https://graph.facebook.com/${adId}`,
            {
                params: {
                access_token: this.accessToken
                }
            }
            );
    
            if (response.status === 200) {
                return adId;
            } else {
                console.error('Failed to delete ad:', response.data.error);
            }
        } catch (error) {
            console.error('Failed to delete ad:', error.message);
        }
        
        return null;
    }
}

interface AdsetParam {
   targeting: any;
   campaignId: string; 
}