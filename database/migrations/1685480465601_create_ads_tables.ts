import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'ads'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('company_id').unsigned().references('companies.id').notNullable();
            table.integer('vehicle_id').unsigned().references('vehicles.id').notNullable();
            table.integer('target_id').unsigned().references('targets.id').notNullable();
            table.string('title').notNullable();
            table.string('link').notNullable();
            table.json('platforms').notNullable();
            table.dateTime('schedule_date').notNullable();
            
            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
