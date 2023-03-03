import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'models'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('brand_id').unsigned().references('brands.id').nullable();
            table.string('name');
            table.string('image');
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
