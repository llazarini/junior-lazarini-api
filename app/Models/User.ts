import { BaseModel, beforeSave, BelongsTo, belongsTo, column, computed, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import UserType from "./UserType";
import Hash from "@ioc:Adonis/Core/Hash";
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Notification from "./Notification";
import Database from "@ioc:Adonis/Lucid/Database";
import Store from './Store';
import { DateTime } from 'luxon'


export default class User extends compose(BaseModel, SoftDeletes) {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public storeId: number;

	@column()
	public advisorId: number;

	@column()
	public userTypeId: number;

	@column()
	public name: string;

	@column()
	public email: string;

	@column()
	public phone: string;

	@column({ serializeAs: null })
	public password: string;

	@column()
	public rememberMeToken?: string;

	@column()
	public active: boolean;

	@column()
	public code: string;

	@column()
	public origin: string;

	@column()
	public forgotPasswordToken: string;

	@column.dateTime()
	public forgotPasswordTokenExpireAt: DateTime;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;

	@beforeSave()
	public static async hash(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password);
		}
		if (user.$dirty.forgot_password_token) {
			user.forgotPasswordToken = await Hash.make(
				user.forgotPasswordToken
			);
		}
	}

	@belongsTo(() => User, { localKey: 'id', foreignKey: 'advisorId' })
	public advisor: BelongsTo<typeof User>;

	@belongsTo(() => UserType)
	public userType: BelongsTo<typeof UserType>;

	@belongsTo(() => Store)
	public store: BelongsTo<typeof Store>;

	@hasMany(() => Notification, {
		onQuery: (query) => {
			query
				.where('read', false)
				.where('notifiable', 'User')
			// .where('notifiable_id', query.)
		}
	})
	public notifications: HasMany<typeof Notification>;

    @computed()
    public get firstName() {
		if (!this.name) {
			return '';
		}
        return this.name
			.substring(0, this.name.indexOf(' '))
			.trim();
    }

	@computed()
    public get lastName() {
		if (!this.name) {
			return '';
		}
        return this.name
			.substring(this.name.indexOf(' '))
			.trim();
    }

	public static async admins() {
		const userTypes = (await UserType
			.query()
			.whereIn('slug', ['admin', 'super-admin']))
			.map(userType => userType.id);
		return User
			.query()
			.whereIn('user_type_id', userTypes)
	}

	public async getNotificationsCount() {
		const count: any = await Database.query()
			.from('notifications')
			.where('read', 0)
			.where('type', 'database')
			.where('notifiable', 'User')
			.where('notifiable_id', this.id)
			.count('* as notifications')
			.first()

		return count.notifications;
	}
}
