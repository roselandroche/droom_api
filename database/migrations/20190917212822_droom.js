exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments();
      users
        .string('username', 128)
        .notNullable()
        .unique();
      users.string('password', 128).notNullable();
      users.enum('role', ['employee', 'employer']).notNullable();
    })
    .createTable('prospect', prospect => {
      prospect.increments();
      prospect.string('name', 60).notNullable();
      prospect
        .string('email', 128)
        .notNullable()
        .unique();
      prospect.string('phone_number', 10).notNullable();
      prospect.string('job_title', 40).notNullable();
      prospect.string('skills', 1000).notNullable();
      prospect.string('about_me', 1000);
    })
    .createTable('employer', employer => {
      employer.increments();
      employer.string('company_name', 128).notNullable();
      employer.string('about_us', 1000).notNullable();
    })
    .createTable('postings', postings => {
      postings.increments();
      postings
        .integer('company_id')
        .unsigned()
        .nonNullable()
        .references('id')
        .inTable('employer')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
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
