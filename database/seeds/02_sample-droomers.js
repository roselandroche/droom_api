exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('prospect')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('prospect').insert([
        {
          id: 1,
          name: 'Allie Robinson',
          email: 'AllieRobinson@lambda.com',
          phone_number: '1234567890',
          job_title: 'Software Engineer',
          skills: 'React, JavaScript, HTML, CSS, GIT'
        },
        {
          id: 2,
          name: 'Rose Landroche',
          email: 'RoseLandroche@lambda.com',
          phone_number: '9876543210',
          job_title: 'Software Engineer',
          skills: 'React, JavaScript, HTML, CSS, GIT'
        },
        {
          id: 3,
          name: 'Carlos Banks',
          email: 'CarlosBanks@lambda.com',
          phone_number: '3219876540',
          job_title: 'Software Engineer',
          skills: 'JavaScript, HTML, CSS, GIT'
        },
        {
          id: 4,
          name: 'Simone Roy',
          email: 'SimoneRoy@lambda.com',
          phone_number: '6549873210',
          job_title: 'Software Engineer',
          skills: 'JavaScript, HTML, CSS, GIT'
        }
      ]);
    });
};
