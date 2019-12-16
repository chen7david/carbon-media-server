
exports.up = function(knex) {
  return knex.schema.createTable('movies', table => {
      table.increments()
      table.string('movieId').unique().notNullable()
      table.string('title').unique().notNullable()
      table.text('description')
      table.string('resolution')
      table.date('released')
      table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('movies')
}