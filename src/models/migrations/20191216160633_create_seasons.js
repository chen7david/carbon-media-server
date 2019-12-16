
exports.up = function(knex) {
  return knex.schema.createTable('seasons', table => {
      table.increments()
      table.unique(['number', 'tvShow_id'])
      table.string('seasonId').unique().notNullable()
      table.integer('number').unique()
      table.integer('tvShow_id').references('id').inTable('tv_shows').onDelete('CASCADE').index()
      table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('seasons')
}