import { DateTime } from "luxon";
import {
	BelongsTo,
	HasMany,
	belongsTo,
	column,
	hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import { compose } from '@ioc:Adonis/Core/Helpers';
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes';
import Brand from "./Brand";
import Model from "./Model";
import VehicleType from "./VehicleType";
import Image from "./Image";
import BaseCompany from "./BaseCompany";

export default class Vehicle extends compose(BaseCompany, SoftDeletes) {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public brandId: number;

	@column()
	public modelId: number;

	@column()
	public vehicleTypeId: number;

	@column()
	public engineId: number;

	@column()
	public vin: string;

	@column()
	public dealerId: string;

	@column()
	public stockNumber: string;

	@column()
	public mileage: number;

	@column()
	public year: number;

	@column()
	public price: number;

	@column()
	public transmission: string;

	@column()
	public bodyStyle: string;

	@column()
	public seats: number;

	@column()
	public soldAt: DateTime;

	@column({ 
		serialize: (value) => typeof value === 'string' ? JSON.parse(value) : value,
		prepare: (value) => JSON.stringify(value),
	})
	public optionals: object;

	@column()
	public description: string;

	@belongsTo(() => Brand)
	public brand: BelongsTo<typeof Brand>;

	@belongsTo(() => Model)
	public model: BelongsTo<typeof Model>;

	@belongsTo(() => VehicleType)
	public vehicleType: BelongsTo<typeof VehicleType>;

	@belongsTo(() => Image, {
		foreignKey: 'id',
		localKey: 'imageableId',
		onQuery: (query) => {
			query.where('imageable', 'vehicles')
		}
	})
	public image: BelongsTo<typeof Image>;

	@hasMany(() => Image, {
		foreignKey: 'imageableId',
		localKey: 'id',
		onQuery: (query) => {
			query.where('imageable', 'vehicles')
		}
	})
	public images: HasMany<typeof Image>;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;
	
	@column.dateTime({ columnName: 'deleted_at' })
	public deletedAt?: DateTime | null;

	/**
	 * Update images
	 * @param vehicle 
	 * @param token 
	 */
	public static async updateImages (vehicle: Vehicle, token: string) {
		await Image.query()
			.where('request_token', token)
			.update({
				imageable_id: vehicle.id,
			})
	}
	
}
