
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('user_started')
      table.dateTime('started');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('games'),
  ]);
};
