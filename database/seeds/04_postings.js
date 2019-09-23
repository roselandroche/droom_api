exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('listings')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('listings').insert([
        {
          company: 1,
          position: 'Junior Software Engineer',
          req_skills: '2 years experience, JavaScript, HTML, CSS, GIT',
          bonus_skills: 'React, Redux, Angular, REST'
        },
        {
          company: 2,
          position: 'Junior Software Engineer',
          req_skills:
            '10 years experience, Angular, React/Redux, SQL, Postgres, Mongo, SQLite, REST, Python, Go',
          bonus_skills: 'If you have another 10 years, that would be cool.'
        }
      ]);
    });
};
