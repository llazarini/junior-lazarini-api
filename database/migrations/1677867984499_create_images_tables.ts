import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'images'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('company_id').unsigned().references('companies.id').notNullable();
            table.string('imageable').notNullable()
            table.bigInteger('imageable_id').notNullable()
            table.string('drive').notNullable()
            table.string('path').notNullable()
            table.string('file_type').notNullable()
            table.string('extension').notNullable()
            table.bigInteger('size').notNullable()
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
            table.dateTime(`deleted_at`, { useTz: true }).defaultTo(null)
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
