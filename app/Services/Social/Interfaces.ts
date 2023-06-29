
export interface ApiKeys {
    facebook?: FacebookKeys;
}

export interface FacebookKeys {
    accessToken: string;
    clientId: string;
    clientSecret: string;
    accountId: string;
    pageId: string;

    campaignId?: string;
    adSetId?: string;
}

export interface Targeting {
    minAge?: number,
    maxAge?: number,
    interests?: string[],
    countries?: string[],
}

export interface Post {
    post: string,
    platforms: 'facebook'[],
    link: string,
    mediaUrls: string[],
    targeting: Targeting,
    scheduleDate?: Date | null, 
    callToAction?: string;

}

export interface Integration {
    set(config: string, value: any),
    post(post: Post),
    delete(id: string),
}

