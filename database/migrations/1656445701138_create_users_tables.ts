import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'users'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('user_type_id').unsigned().references('user_types.id').notNullable();
            table.string(`name`, 255)
            table.string(`email`, 255).nullable()
            table.string(`phone`, 32).nullable()
            table.string('password', 255).nullable()
            table.string('remember_me_token').nullable()
            table.string('forgot_password_token').nullable()

            table.boolean(`active`).defaultTo(1)

            // Timestamps
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
            table.dateTime(`deleted_at`, { useTz: true }).defaultTo(null)
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
