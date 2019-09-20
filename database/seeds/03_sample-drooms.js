exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employer')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('employer').insert([
        {
          id: 1,
          company_name: 'Super Cool Startup, LLC',
          about_us:
            'We are a Super Cool Startup, tm. We are looking for a junior developer for a awesome opportunity working with great developers to develop cutting edge websites and applications for <insert company you have heard of here>! Swipe right or email me at RecruitmentDude@scs.com',
          position: 'Junior Software Engineer',
          req_skills: '2 years experience, JavaScript, HTML, CSS, GIT',
          bonus_skills: 'React, Redux, Angular, REST'
        },
        {
          id: 2,
          company_name: 'Company',
          about_us:
            'We are looking for a potential candidate for a development role at Company. Salary range is 30-40k.',
          position: 'Junior Software Engineer',
          req_skills:
            '10 years experience, Angular, React/Redux, SQL, Postgres, Mongo, SQLite, REST, Python, Go',
          bonus_skills: 'If you have another 10 years, that would be cool.'
        }
      ]);
    });
};
