exports.up = function(knex) {
  return knex.schema.createTable('videos', table => {
      table.increments()
      table.string('videoId').unique().notNullable()
      table.string('filename').unique().notNullable()
      table.string('resolution')
      table.string('mimetype').notNullable()
      table.integer('size').notNullable()
      table.boolean('default').defaultTo(false)
      table.integer('movie_id').references('id').inTable('movies').onDelete('CASCADE').index()
      table.integer('episode_id').references('id').inTable('episodes').onDelete('CASCADE').index()
      table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('videos')
}