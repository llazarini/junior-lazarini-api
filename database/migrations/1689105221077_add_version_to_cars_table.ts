import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'vehicles'

    public async up () {
        this.schema.alterTable('vehicles', (table) => {
            table.string('version', 128).after('fuel_id');
        })
    }

    public async down () {
        this.schema.alterTable('vehicles', (table) => {
            table.dropColumn('version');
        })
    }
}
