import { DateTime } from "luxon";
import {
	BelongsTo,
	HasMany,
	HasManyThrough,
	belongsTo,
	column,
	hasMany,
	hasManyThrough,
} from "@ioc:Adonis/Lucid/Orm";
import { compose } from '@ioc:Adonis/Core/Helpers';
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes';
import Brand from "./Brand";
import Model from "./Model";
import VehicleType from "./VehicleType";
import Image from "./Image";
import BaseCompany from "./BaseCompany";
import Ad from "./Ad";
import Optional from "./Optional";
import VehicleOptional from "./VehicleOptional";
import Fuel from "./Fuel";

export default class Vehicle extends compose(BaseCompany, SoftDeletes) {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public brandId: number;

	@column()
	public modelId: number;

	@column()
	public fuelId: number;

	@column()
	public vehicleTypeId: number;

	@column()
	public engineId: number;

	@column()
	public version: string;

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
	public description: string;

	@column()
	public engineCylinderCapacity: string;

	@column()
	public enginePower: string;

	@column()
	public doorCount: number;

	@column()
	public seatsCount: number;

	@column()
	public ownersCount: number;

	@column()
	public origin: string;

	@column.dateTime()
	public soldAt: DateTime | null;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;
	
	@column.dateTime({ columnName: 'deleted_at' })
	public deletedAt?: DateTime | null;


	@belongsTo(() => Brand)
	public brand: BelongsTo<typeof Brand>;

	@belongsTo(() => Model)
	public model: BelongsTo<typeof Model>;

	@belongsTo(() => Fuel)
	public fuel: BelongsTo<typeof Fuel>;


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

	@hasMany(() => Ad, {
		foreignKey: 'vehicleId',
		localKey: 'id',
	})
	public ads: HasMany<typeof Ad>;

	@hasManyThrough([() => Optional, () => VehicleOptional], {
		foreignKey: 'vehicleId',
		localKey: 'id',
		throughLocalKey: 'optionalId',
		throughForeignKey: 'id'
	})
	public optionals: HasManyThrough<typeof Optional>;

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
