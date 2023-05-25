import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'vehicles'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('brand_id').unsigned().references('brands.id');
            table.integer('model_id').unsigned().references('models.id');
            table.integer('vehicle_type_id').unsigned().references('vehicle_types.id');
            table.integer('fuel_id').unsigned().references('fuels.id');
            table.double('mileage').notNullable();
            table.string('vin').notNullable();
            table.string('stock_number');
            table.integer('year');
            table.double('price');
            table.string('transmission');
            table.string('body_style');
            table.string('exterior_color');
            table.string('interior_color');
            table.json('description');
            table.json('optionals');
            table.dateTime('sold_at').defaultTo(null);

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
            table.dateTime(`deleted_at`, { useTz: true }).defaultTo(null)
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
