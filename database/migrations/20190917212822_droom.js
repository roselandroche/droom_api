exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments();
      users
        .string('username', 128)
        .notNullable()
        .unique();
      users.string('password', 40).notNullable();
      users.enum('role', ['employee', 'employer']).notNullable();
    })
    .createTable('prospect', prospect => {
      prospect.increments();
      prospect.string('name', 128).notNullable();
      prospect
        .string('email', 128)
        .notNullable()
        .unique();
      prospect.bigInteger('phone_number', 10).notNullable();
      prospect.string('job_title', 128).notNullable();
      prospect.string('skills', 1000).notNullable();
    })
    .createTable('employer', employer => {
      employer.increments();
      employer.string('company_name', 128).notNullable();
      employer.string('about_us', 1000).notNullable();
      employer.string('position', 128).notNullable();
      employer.string('req_skills', 1000).notNullable();
      employer.string('bonus_skills', 1000).notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('prospect')
    .dropTableIfExists('employer');
};
