import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'targets'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('company_id').unsigned().references('companies.id').nullable();
            table.integer('country_id').unsigned().references('countries.id').nullable();
            table.string('name').notNullable();
            table.integer('min_age').notNullable().defaultTo(18);
            table.integer('max_age').notNullable().defaultTo(18);
            table.double('amount_bid').defaultTo(0)
            table.double('daily_budget').defaultTo(0)
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
