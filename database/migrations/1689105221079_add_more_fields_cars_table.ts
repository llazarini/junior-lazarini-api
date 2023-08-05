import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'vehicles'

    public async up () {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('engine_cylinder_capacity', 128).after('version');
            table.string('engine_power', 128).after('engine_cylinder_capacity');
            table.integer('door_count').after('engine_power').defaultTo(5).notNullable();
            table.integer('owners_count').after('door_count').defaultTo(1).notNullable();
            table.integer('seats_count').after('owners_count').defaultTo(1).notNullable();
            table.string('origin').after('owners_count').notNullable();
        })
    }

    public async down () {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('engine_cylinder_capacity');
            table.dropColumn('engine_power');
            table.dropColumn('door_count');
            table.dropColumn('owners_count');
            table.dropColumn('seats_count');
            table.dropColumn('origin');
        })
    }
}
