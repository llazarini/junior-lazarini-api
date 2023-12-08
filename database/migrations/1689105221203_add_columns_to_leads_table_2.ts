import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    public async up () {
        this.schema.alterTable("leads", (table) => {
            table.json('import_from_country_id').nullable().after('already_imported');
            table.string('motivation').nullable().after('import_from_country_id')
        })
    }

    public async down () {
        this.schema.alterTable("leads", (table) => {
            table.dropColumn('import_from_country_id');
            table.dropColumn('motivation');
        })
    }
}
