import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    public async up () {
        this.schema.alterTable("leads", (table) => {
            table.string('state').nullable().after('name');
            table.boolean('already_imported').defaultTo(true).after('state');
            table.boolean('already_sold').defaultTo(true).after('already_imported');
        })
    }

    public async down () {
        this.schema.alterTable("leads", (table) => {
            table.dropColumn('state');
            table.dropColumn('already_imported');
            table.dropColumn('already_sold');
        })
    }
}
