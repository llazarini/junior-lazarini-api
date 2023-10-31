import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    public async up () {
        this.schema.createTable("extractions", (table) => {
            table.increments('id')
            table.string('source').notNullable();
            table.uuid('extraction_hash').notNullable();            
            table.enum('status', ['success', 'processing', 'failed', 'waiting']).defaultTo('waiting').notNullable();
            table.integer('extraction_failed').defaultTo(0).notNullable();
            table.integer('extraction_succeeded').defaultTo(0).notNullable();
            table.integer('extraction_total').defaultTo(0).notNullable();
            table.json('details').defaultTo({}).notNullable();
            table.dateTime('extraction_date').notNullable();
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })


        this.schema.createTable("extraction_vehicles", (table) => {
            table.increments('id')
            table.string('source').notNullable();
            table.uuid('extraction_hash').notNullable();
            table.integer('extraction_id').unsigned().references('extractions.id').nullable();
            table.integer('brand_id').unsigned().references('brands.id').nullable();
            table.integer('model_id').unsigned().references('models.id').nullable();
            table.integer('fuel_id').unsigned().references('fuels.id').nullable();
            table.integer('vehicle_type_id').unsigned().references('vehicle_types.id').nullable();
            table.string('link').notNullable();
            table.string('version').notNullable();
            table.string('fuel_type');
            table.string('brand_description');
            table.string('model_description');
            table.integer('year');
            table.integer('first_registration_year');
            table.double('price');
            table.string('transmission');
            table.double('mileage');
            table.string('engine_power');
            table.string('engine_cylinder_capacity');
            table.string('featured_image');

            table.string('location');
            table.string('location_state');
            table.integer('location_lat');
            table.integer('location_lng');

            table.boolean('details_extraction_complete').defaultTo(false).notNullable();

            table.dateTime('extraction_date').notNullable();
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down () {
        this.schema.dropTable("extraction_vehicles")
        this.schema.dropTable("extractions")
    }
}
