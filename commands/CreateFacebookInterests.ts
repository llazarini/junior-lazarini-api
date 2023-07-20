import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class CreateFacebookInterests extends BaseCommand {
/**
 * Command name is used to run the command
 */
public static commandName = 'create:facebook_interests'

    /**
     * Command description is displayed in the "help" output
     */
    public static description = ''

    public static settings = {
        /**
         * Set the following value to true, if you want to load the application
         * before running the command. Don't forget to call `node ace generate:manifest` 
         * afterwards.
         */
        loadApp: true,

        /**
         * Set the following value to true, if you want this command to keep running until
         * you manually decide to exit the process. Don't forget to call 
         * `node ace generate:manifest` afterwards.
         */
        stayAlive: false,
    }

    public async run() {
        const { Facebook } = await import('App/Services/Social/integrations/Facebook')
        const facebook = new Facebook({ 
            accessToken: 'EAADZCyr5K448BAATi4bHZCnLZA4Xdg9WdOMl5vmZCi3whfjGQ5DcR7M6FSaGP5h93luu7FrgZCRp3oBALeWlFvT6iY71P6xeZAzIBi0IyQ48HvjBBXYGaVxNKxs9M0CZBaUd4gqxie7Xu984X3X2xZApI2LLyS65ZB4SzXxZA4LpMZC9jn3dSjUHkfRS4yFTZBdpZCg4ZD',
            clientSecret: '55dea9b16495144fff332714a79b66ee',
            clientId: '281246241055631',
            accountId: 'act_415509278537487',
            pageId: '101925319621368',
        })

        const interests = await facebook.searchInterests('ford focus');
        console.log(interests)
    }
}
