import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'vehicles'

    public async up () {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('description').notNullable().alter()
        })
    }

    public async down () {
        this.schema.alterTable(this.tableName, (table) => {
            table.json('description').notNullable().alter()
        })
    }
}
