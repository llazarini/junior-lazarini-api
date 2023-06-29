import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    public async up () {
        this.schema.createTable('countries', (table) => {
            table.increments('id')
            table.string('name');
            table.string('code');

            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })

        this.schema.createTable('states', (table) => {
            table.increments('id')
            table.integer('country_id').unsigned().references('countries.id').notNullable();
            table.string('name').notNullable();
            table.string('code').notNullable();
            table.string('facebook_code').nullable();

            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down () {
        this.schema.dropTable('countries')
        this.schema.dropTable('states')
    }
}
