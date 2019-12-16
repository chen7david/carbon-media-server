
exports.up = function(knex) {
  return knex.schema.createTable('tv_shows', table => {
      table.increments()
      table.string('tvShowId').unique().notNullable()
      table.string('title').unique().notNullable()
      table.text('description')
      table.string('cover')
      table.string('poster')
      table.date('released')
      table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('tv_shows')
}