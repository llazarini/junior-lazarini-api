import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'leads'

    public async up () {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('comments', 2048).after('description');
        })
    }

    public async down () {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('comments');
        })
    }
}
