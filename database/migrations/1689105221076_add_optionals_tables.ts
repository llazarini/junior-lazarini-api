import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'optionals'

    public async up () {
        this.schema.createTable('optionals', (table) => {
            table.increments('id')
            table.string('name');
            table.string('slug');
            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
            table.dateTime(`deleted_at`, { useTz: true }).defaultTo(null)
        })

        this.schema.createTable(`vehicle_optionals`, (table) => {
            table.increments('id')
            table.integer('vehicle_id').unsigned().references('vehicles.id').nullable();
            table.integer('optional_id').unsigned().references('optionals.id').nullable();
            
            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
            table.dateTime(`deleted_at`, { useTz: true }).defaultTo(null)
        })


        this.schema.alterTable('vehicles', (table) => {
            table.dropColumn('optionals');
        })
    }

    public async down () {
        this.schema.dropTable(`vehicle_optionals`)
        this.schema.dropTable('optionals')

        this.schema.alterTable('vehicles', (table) => {
            table.json('optionals');
        })
    }
}
