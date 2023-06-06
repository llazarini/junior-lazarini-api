import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'images'

    public async up () {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('imageable_id').unsigned().nullable().alter();
            table.string('request_token').notNullable().after('imageable_id')
        })
    }

    public async down () {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('imageable_id').unsigned().notNullable().alter();
            table.dropColumn('request_token')
        })
    }
}
