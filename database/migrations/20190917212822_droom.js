exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments();

      users
        .string('username', 128)
        .notNullable()
        .unique();
      users.string('password', 128).notNullable();
      users.string('role', 128).notNullable();
    })
    .createTable('prospect', function(prospect) {
      prospect.increments();
    })
    .createTable('employer', function(employer) {
      employer.increments();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('prospect')
    .dropTableIfExists('employer');
};
