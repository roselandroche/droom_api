exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employer')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('employer').insert([
        {
          company_name: 'Super Cool Startup, LLC',
          about_us:
            'We are a Super Cool Startup, tm. We are looking for a junior developer for a awesome opportunity working with great developers to develop cutting edge websites and applications for <insert company you have heard of here>! Swipe right or email me at RecruitmentDude@scs.com'
        },
        {
          company_name: 'Company',
          about_us:
            'We are looking for a potential candidate for a development role at Company. Salary range is 30-40k.'
        }
      ]);
    });
};
