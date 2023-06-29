import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'target_interests'

    public async up () {
        this.schema.createTable('interests', (table) => {
            table.increments('id')
            table.string('name').notNullable();
            table.string('facebook_code').notNullable();
            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })

        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('target_id').unsigned().references('targets.id').nullable();
            table.integer('interest_id').unsigned().references('interests.id').nullable();
            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
        this.schema.dropTable('interests')
    }
}
