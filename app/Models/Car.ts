import { DateTime } from "luxon";
import {
	BaseModel,
	beforeFetch,
	beforeFind,
	beforePaginate,
	belongsTo,
	BelongsTo,
	column,
	computed,
	HasMany,
	hasMany,
	HasOne,
	hasOne,
	ModelQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Orm";
import CarImage from "./CarImage";
import Model from "./Model";
import Video from "./Video";
import { compose } from '@ioc:Adonis/Core/Helpers';
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes';
import Engine from "./Engine";
import Transmission from "./Transmission";

export default class Car extends compose(BaseModel, SoftDeletes) {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public vin: string;

	@column()
	public dealerId: string;

	@column()
	public stockNumber: string;

	@column()
	public brandId: number;

	@column()
	public modelId: number;

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
	public type: string;

	@column()
	public exteriorColor: string;

	@column()
	public interiorColor: string;

	@column()
	public exterior360Id: string;

	@column()
	public interior360Id: string;

	@column()
	public similarity: number;

	@column()
	public data_quality: string;

	@column()
	public cityMilesPerGallon: number;

	@column()
	public highwayMilesPerGallon: number;

	@column()
	public engineId: number;

	@column()
	public transmissionId: number;

	@column()
	public drivenWheels: string;

	@column()
	public numOfDoors: string;

	@column()
	public manufacturerCode: string;

	@column()
	public vehicleSize: string;

	@column()
	public vehicleStyle: string;

	@column()
	public epaClass: string;

	@column()
	public market: string;

	@column()
	public squishVin: string;

	@column()
	public matchingType: string;

	@column()
	public options: object;

	@column()
	public colours: object;

	@column()
	public gotDetails: boolean;

	@column()
	public data_quality_description: string;
	static dealers: Array<string> = [
		'Evrdrive'
	];

	@computed()
	public get exterior360_url() {
		if (!this.exterior360Id) {
			return null;
		}
		return `https://media.flickfusion.net/p/360.php?video_fk=${this.exterior360Id}&playerType=exterior`;
	}

	@computed()
	public get interior360_url() {
		if (!this.interior360Id) {
			return null;
		}
		return `https://media.flickfusion.net/p/360.php?video_fk=${this.interior360Id}&playerType=interior-pano`;
	}

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;
	
	@column.dateTime({ columnName: 'deleted_at' })
	public deletedAt?: DateTime | null;


	@hasMany(() => CarImage, {
		onQuery: (query) => {
			query.where("type", "image").orderBy("position", "asc");
		},
	})
	public images: HasMany<typeof CarImage>;

	@hasMany(() => CarImage, {
		onQuery: (query) => {
			query.where("type", "hologram").orderBy("position", "asc");
		},
	})
	public hologramImages: HasMany<typeof CarImage>;

	@belongsTo(() => Model)
	public model: BelongsTo<typeof Model>;

	@belongsTo(() => Engine)
	public engine: BelongsTo<typeof Engine>;

	@belongsTo(() => Transmission)
	public vehicleTransmission: BelongsTo<typeof Transmission>;

	@hasOne(() => Video, {
		onQuery: (query) => {
			query.orderBy("id", "desc");
		},
	})
	public hologram: HasOne<typeof Video>;

	@hasOne(() => CarImage, {
		onQuery: (query) => {
			query.where("type", "vr").orderBy("id", "desc");
		},
	})
	public vr: HasOne<typeof CarImage>;

	
	/**
	 * Flag the vehicle with some statuses
	 * @param car 
	 * @returns 
	 */
	public static async flagVehicle(car: Car | null) {
		if (!car) {
			return false;
		}
		await car.load('hologram');
		await car.load('vr');
		await car.load('images');

		let qualityDescription: string[] = [];
		car.data_quality = "good"; // default
		// Warning:
		if (car.mileage === 0 || car.mileage === null) {
			car.data_quality = "warning";
			qualityDescription.push("Mileage is zero");
		}
		// Missing VR
		if (!car.vr) {
			car.data_quality = "warning";
			qualityDescription.push("Missing vr images");
		}

		// Missing Interior Photos and Exterior Photos (details page)
		if (
			car.images.length <= 4 &&
			car.images.length != 0
		) {
			car.data_quality = "warning";
			qualityDescription.push("Too few interior/exterior images");
		}
		// Critical:
		if (!car.hologram) {
			car.data_quality = "critical";
			qualityDescription.push("Missing hologram");
		}
		if (car.price === 0 || car.price === null) {
			car.data_quality = "critical";
			qualityDescription.push("Price is zero");
		}
		if (car.stockNumber === "" || car.stockNumber === null) {
			car.data_quality = "critical";
			qualityDescription.push("Missing stock number");
		}
		if (car.images.length == 0) {
			car.data_quality = "critical";
			qualityDescription.push("Missing interior/exterior images");
		}

		car.data_quality_description = qualityDescription.join(",");
		return await car.save();
	}
}
