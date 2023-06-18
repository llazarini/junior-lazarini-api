import Env from "@ioc:Adonis/Core/Env";
import User from "App/Models/User";
import Database from '@ioc:Adonis/Lucid/Database';
import { DateTime } from "luxon";
import UserType from "App/Models/UserType";
import Hash from "@ioc:Adonis/Core/Hash";
import { EmailService } from "App/Services/Email";

export default class AuthController {
    /**
     * Login for users
     * @param param0
     * @returns
     */
    public async login({ auth, request, response }) {
        let email = request.input("email") || "";
        const password = request.input("password") || "";
        const code = request.input("code") || "";
        const only = request.input("only") || null;
        let onlyUserType: any = null;

        if (code.length) {
            const user = await User.query().where("code", code).first();

            if (user) {
                email = user.email;
            }
        }

        if (only) {
            onlyUserType = await UserType
                .query()
                .where('slug', only)
                .first();
        }

        try {
            const token = await auth.use('api')
                .attempt(email, password)
            const user = await User.query()
                .preload('userType')
                .where('email', email)
                .first()

            if (only && onlyUserType?.id !== user?.userTypeId) {
                return response.badRequest({
                    message: `Only ${onlyUserType.name}s can acess this feature. Please, ask for a ${onlyUserType.name} to login and use the feature.`
                })
            }

            if (!user?.active) {
                return response.badRequest({
                    message: 'Please, confirm your account before trying to login. We sent an account confirmation to your e-mail.'
                })
            }

            //const notifications = await user?.getNotificationsCount();
            return {
                ...token,
                //notifications,
                user,
            }
        } catch (e) {
            return response.badRequest({
                message: 'Credentials incorrect. Please try again.'
            })
        }
    }

    public async changePassword({auth, request, response}){
            let currentPassword= request.input('current_password');
            const user = await User.find(auth.user.id);
            let newPassword = request.input("new_password");
            let newPasswordConfirmation = request.input("new_password_confirmation");
            if(!user){
                return response.badRequest({  message: "This user does not exist."})
  
            }
            if (currentPassword) {
                const isValid= await Hash.verify(user.password, currentPassword)
                if(!isValid){
                    return response.badRequest({  message: "Please re-type current password."})
                }
            }
            if(currentPassword===newPassword){
                return response.badRequest({
                    message: "Cannot use already existing password.",
                });
            }
            if (newPassword !== newPasswordConfirmation) {
                return response.badRequest({
                    message: "The new password fields do not match.",
                });
            }     
            user.password = newPassword;
            if (!(await user.save())) {
                return response.badRequest({
                    message: "An error occured when trying to save the user.",
                });
            }
            return {
                message: "Your password was successfully changed.",
            };
    }

    /**
     * Forgot password (send a token to e-mail)
     * @param param0
     * @returns
     */
    public async forgotPassword({ auth, request, response }) {
        const email = request.input("email");
        const user = await User.query().where("email", email).first();

        if (!user) {
            return response.badRequest({
                message: "The e-mail was not found.",
            });
        }

        const token = Math.random().toString().substring(2, 8);

        user.forgotPasswordToken = token;
        user.forgotPasswordTokenExpireAt = DateTime.now().plus({ minutes: 30 });

        if (!(await user.save())) {
            return response.badRequest({
                message: "An error occurred when trying to send you the code.",
            });
        }

        try {
            const link = `${Env.get('FRONT_URL')}guest/new-password?token=${token}`;
            const name = user.name.toUpperCase();

            await EmailService.send(user.email, "Email confirmation for password change", "emails/forgotPassword", {
                link,
                name,
            })

            return {
                message:
                    "We sent a token to your e-mail. Please confirm your e-mail.",
            };
        } catch (e) {
            console.error(e);
            return response.badRequest({
                message:
                    "Something happened when we were trying to send you an e-mail. Please contact the support team.",
            });
        }
    }

    /**
     * New password
     * @param param0
     * @returns
     */
    public async newPassword({ auth, request, response }) {
        const token = request.input("token");
        const password = request.input("password");
        const passwordConfirmation = request.input("password_confirmation");

        if (!token || password !== passwordConfirmation) {
            return response.badRequest({
                message: "The password and confirmation must be the same.",
            });
        }

        const user = await User.query()
            .where("forgot_password_token", token)
            .first();
        if (!user) {
            return response.badRequest({
                message: "This token is invalid.",
            });
        }
        // Check if the token is valid
        if (DateTime.now() > user.forgotPasswordTokenExpireAt) {
            return response.badRequest({
                message: "The token has expired. Please, try again.",
            });
        }
        user.password = password;
        if (!(await user.save())) {
            return response.badRequest({
                message: "Occurred an error when trying to save the user.",
            });
        }
        return {
            message: "Your password was successfully changed.",
        };
    }
    /**
     * Get user and notifications
     * @param param0 
     * @returns 
     */
    public async me({ auth, request, response }) {
        const user = await User.find(auth.user.id);
        await user?.load('userType');
        const notifications = await Database.query()
            .from(Notification.table)
            .where('type', 'database')
            .where('notifiable', 'User')
            .where('notifiable_id', auth.user.id)
            .where('read', false)
            .count('* as count')
            .first()

        const videosToBeReview = await Database.query()
            .from(Video.table)
            .where('status', 'review')
            .count('* as count')
            .first()
        return {
            user,
            notifications: notifications.count || 0,
            videos_under_review: videosToBeReview.count || 0,
        };
    }

    /**
     * Get notifications of the logged user
     * @param param0 
     * @returns 
     */
    public async notifications({ auth, request, response }) {
        const notifications = await Notification.query()
            .where('type', 'database')
            .where('notifiable', 'User')
            .where('notifiable_id', auth.user.id)
            .orderBy('id', 'desc')
            .paginate(request.input('page') || 1, 10)
        return notifications;
    }

    /**
     * Clear a single notification
     */
    public async clear({ auth, request, response }) {
        const notification = await Notification.find(request.param('id'));
        if (!notification) {
            return response.badRequest({
                message: 'Error when trying to clear notification.'
            })
        }
        notification.read = true;
        await notification.save();
        return {
            message: 'Notification successfully cleared.'
        };
    }

    /**
     * Clear all notifications of the logged user
     */
    public async clearAll({ auth, request, response }) {
        await Notification
            .query()
            .where('type', 'database')
            .where('notifiable', 'User')
            .where('notifiable_id', auth.user.id)
            .update({
                read: true
            })
        return {
            message: 'All your notifications was cleared.'
        };
    }

    /**
     * Check the token for the email confirmation
     */
    public async checkToken({ auth, request, response }) {
        const token = request.param('token');

        const apiToken = await ApiToken
            .query()
            .where('type', 'email_confirmation')
            .where('token', token || null)
            .first();

        const user = await User.find(apiToken?.userId || 0);

        if (!apiToken || !user || apiToken.expiresAt < DateTime.now()) {
            return response.badRequest({
                message: 'This token is invalid.'
            });
        }

        user.active = true;
        user.save();

        return {
            message: 'Your e-mail has been confirmed.'
        };
    }
}
