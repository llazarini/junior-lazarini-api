import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'notifications'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.string('notifiable').nullable();
            table.integer('notifiable_id').unsigned().nullable();
            table.enum('type', ['database', 'email', 'sms']).nullable()
            table.string('icon', 32).nullable()
            table.string('title', 128).nullable()
            table.string('description', 1024).nullable()
            table.string('link', 256).nullable()
            table.json('data').nullable()
            table.boolean('read').defaultTo(false)
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
