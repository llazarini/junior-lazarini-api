import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'vehicles'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('brand_id').unsigned().references('brands.id').nullable();
            table.integer('model_id').unsigned().references('models.id').nullable();
            table.integer('vehicle_type_id').unsigned().references('vehicle_types.id').nullable();
            table.string('vin');
            table.string('stock_number');
            table.double('mileage');
            table.integer('year');
            table.double('price');
            table.string('transmission');
            table.string('type');
            table.string('body_style');
            table.string('exterior_color');
            table.string('interior_color');

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
