exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('prospect')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('prospect').insert([
        {
          name: 'Allie Robinson',
          email: 'AllieRobinson@lambda.com',
          phone_number: '1234567890',
          job_title: 'Software Engineer',
          skills: 'React, JavaScript, HTML, CSS, GIT',
          about_me: 'My name is Allie! I am a student at Lambda School!'
        },
        {
          name: 'Rose Landroche',
          email: 'RoseLandroche@lambda.com',
          phone_number: '9876543210',
          job_title: 'Software Engineer',
          skills: 'React, JavaScript, HTML, CSS, GIT',
          about_me: 'My name is Rose! I am a student at Lambda School!'
        },
        {
          name: 'Carlos Banks',
          email: 'CarlosBanks@lambda.com',
          phone_number: '3219876540',
          job_title: 'Software Engineer',
          skills: 'JavaScript, HTML, CSS, GIT',
          about_me: 'My name is Carlos! I am a student at Lambda School!'
        },
        {
          name: 'Simone Roy',
          email: 'SimoneRoy@lambda.com',
          phone_number: '6549873210',
          job_title: 'Software Engineer',
          skills: 'JavaScript, HTML, CSS, GIT',
          about_me: 'My name is Simone! I am a student at Lambda School!'
        }
      ]);
    });
};
