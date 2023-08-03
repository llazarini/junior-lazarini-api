import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View';


export class EmailService {
    public static async send(to: string, subject: string, layout: string, object?: any) {
        return await Mail.send((message) => {
            message
                .from(Env.get('EMAIL_FROM'), Env.get('EMAIL_FROM_NAME') || 'Junior Lazarini')
                .to(to)
                .subject(subject)
                .htmlView(layout, object);
        })
    }

    public static async sendRaw(to: string, subject: string, layout: string, object?: any) {
        const render = View.renderSync(layout, object);
        return await Mail.send((message) => {
            message
                .from(Env.get('EMAIL_FROM'), Env.get('EMAIL_FROM_NAME') || 'Junior Lazarini')
                .to(to)
                .subject(subject)
                .text(render);
        })
    }
} 