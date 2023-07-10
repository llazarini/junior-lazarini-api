import { ApiKeys, Integration, Post } from "./Interfaces";
import { Facebook } from "./integrations/Facebook";


export class Social {
    private apiKeys: ApiKeys;
    private integrations: Array<Integration> = []

    constructor (apiKeys: ApiKeys) {
        this.apiKeys = apiKeys;
        this.setIntegrations();
    }

    private setIntegrations() {
        if (this.apiKeys.facebook) {
            this.integrations.push(new Facebook(this.apiKeys.facebook))
        }
    }

    public getIntegration(type: 'facebook'): Integration {
        return this.integrations[0];
    }

    public set(config: string, value: any) {
        this.integrations.map(integration => integration.set(config, value));
    }

    public async post(post: Post) {
        const responses = await Promise.allSettled(post.platforms.map(async (platform) => {
            const integration = this.getIntegration(platform);
            return {
                platform,
                response: await integration.post(post)
            }
        }))

        return responses.map((response: any) => {
            return response.value;
        })
    }
}