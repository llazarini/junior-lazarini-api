import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'interests'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('lead_id').unsigned().references('leads.id').notNullable();
            table.integer('specific_model_id').unsigned().references('models.id').nullable();
            table.double('from_price');
            table.double('to_price');
            table.integer('from_year');
            table.integer('to_year');
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
