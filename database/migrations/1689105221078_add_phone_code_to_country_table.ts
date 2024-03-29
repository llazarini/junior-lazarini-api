import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'countries'

    public async up () {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('country_code', 4).after('code');
            table.string('image', 256).after('country_code');
        })
    }

    public async down () {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('country_code');
            table.dropColumn('image');
        })
    }
}
