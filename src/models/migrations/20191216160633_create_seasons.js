
exports.up = function(knex) {
  return knex.schema.createTable('seasons', table => {
      table.increments()
      table.unique(['number', 'tvshow_id'])
      table.string('seasonId').unique().notNullable()
      table.integer('number')
      table.integer('tvshow_id').references('id').inTable('tvshows').onDelete('CASCADE').index()
      table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('seasons')
}