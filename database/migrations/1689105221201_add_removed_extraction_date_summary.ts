import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    public async up () {
        this.schema.alterTable("extraction_vehicles", (table) => {
            table.dateTime('removed_date').nullable().after('location_lng');
        })
    }

    public async down () {
        this.schema.alterTable("extraction_vehicles", (table) => {
            table.dropColumn('removed_date');
        })
    }
}
