import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'leads'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('name', 128);
            table.string('email', 128);
            table.string('phone', 16);
            table.text('description').nullable();
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
            table.timestamp('deleted_at', { useTz: true })
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
