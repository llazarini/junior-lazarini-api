import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'ad_integrations'

    public async up () {
        this.schema.createTable('integrations', (table) => {
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

        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('ad_id').unsigned().references('ads.id').nullable();
            table.integer('integration_id').unsigned().references('integrations.id').nullable();
            table.string('reference_id').nullable();
            table.json('additional_data').nullable();
            table.boolean('integrated').defaultTo(false);
            
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
        this.schema.dropTable('integrations')
    }
}
