import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'optionals'

    public async up () {
        this.schema.alterTable('leads', (table) => {
            table.integer('country_id').unsigned().references('countries.id').after('id');
            table.enum('import_as', ['individual', 'company'])
                .nullable()
                .after('description');
            table.enum('interested_in', ['mentoring', 'ebook', 'vehicle', 'contact'])
                .nullable()
                .after('description');
        })
    }

    public async down () {
        this.schema.alterTable('leads', (table) => {
            table.dropForeign('country_id');
            table.dropColumn('country_id');
            table.dropColumn('import_as');
            table.dropColumn('interested_in');
        })
    }
}
