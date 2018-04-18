
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('participant', function(table) {
      table.increments('id').primary();
      table.string('user_id');
      table.string('game_id');
      table.integer('score');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('participant'),
  ]);
};
