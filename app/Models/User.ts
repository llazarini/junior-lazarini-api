import { BaseModel, beforeSave, BelongsTo, belongsTo, column, computed, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import UserType from "./UserType";
import Hash from "@ioc:Adonis/Core/Hash";
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Database from "@ioc:Adonis/Lucid/Database";
import { DateTime } from 'luxon'


export default class User extends compose(BaseModel, SoftDeletes) {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public userTypeId: number;

	@column()
	public name: string;

	@column()
	public email: string;

	@column({ serializeAs: null })
	public password: string;

	@column()
	public rememberMeToken?: string;

	@column()
	public active: boolean;

	@column()
	public code: string;

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

	@belongsTo(() => UserType)
	public userType: BelongsTo<typeof UserType>;
}
