exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table
      .string("username", 128)
      .notNullable()
      .unique()
    table.string("password", 128).notNullable()
    table.string("department").notNullable()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users")
}
