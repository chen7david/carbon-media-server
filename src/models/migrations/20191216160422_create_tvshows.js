
exports.up = function(knex) {
  return knex.schema.createTable('tvshows', table => {
      table.increments()
      table.string('tvshowId').unique().notNullable()
      table.string('title').unique().notNullable()
      table.text('description')
      table.date('released')
      table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('tvshows')
}