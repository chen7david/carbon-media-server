
exports.up = function(knex) {
  return knex.schema.createTable('episodes', table => {
      table.increments()
      table.string('episodeId').unique().notNullable()
      table.string('title').unique().notNullable()
      table.text('description')
      table.date('released')
      table.integer('season_id').references('id').inTable('seasons').onDelete('CASCADE').index()
      table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('episodes')
}