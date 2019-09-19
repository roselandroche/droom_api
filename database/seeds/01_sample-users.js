exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'testDroomer',
          password: 'drooming',
          role: 'employee'
        },
        {
          id: 2,
          username: 'testEmployer',
          password: 'employingpeeps',
          role: 'employer'
        }
      ]);
    });
};
