const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sample = require('../models/sample-model');

// POST /api/sample/register -> {username, password, role[employee, employer]}
router.post('/register', validateRegistration, (req, res) => {
  // Destructures body into user
  const user = req.body;
  // Takes users password and encrypts
  user.password = bcrypt.hashSync(user.password, 12);

  // Using the helper function add, we send the user object to the database, then we send the user a response
  // Introducing them to our dadjoke hellscape
  sample
    .sampleAddUser(user)
    .then(sampleUser => {
      const { username } = sampleUser;
      res.status(201).json({ message: `Good luck, ${username}` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error processing request' });
    });
});

// POST /api/sample/login -> {username, password}
router.post('/login', (req, res) => {
  // Destructing username and password from request body
  const { username, password } = req.body;

  // Using our helper function to filter to find a user matching our username, if that user exists and the password
  // matches using bcrypts compareSync function the user is issued a token using our middleware generator function. The user is then
  // returned an object with a welcome back message and the token. If either the user does not exist or the password cannot be verified
  // YOU SHALL NOT PASS! if something weird happens we send them ol' reliable status500.
  sample
    .sampleFindBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = sampleGenerator(user);
        res
          .status(200)
          .json({ message: `Welcome Back ${user.username}`, token });
      } else {
        res.status(401).json({ message: 'You shall not pass! 🧙‍' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error processing request' });
    });
});

// GET /api/sample/register
router.get('/register', async (_, res) => {
  try {
    const getSingleUser = await sample.sampleFindById(1);
    res.status(200).json(getSingleUser);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

// GET /api/sample/login
router.get('/login', async (_, res) => {
  try {
    const getUsers = await sample.sampleGet('users');
    res.status(200).json(getUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

// GET /api/sample/prospects
router.get('/prospects', async (_, res) => {
  try {
    const getProspects = await sample.sampleGet('prospect');
    res.status(200).json(getProspects);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

// GET /api/sample/employers
router.get('/employers', async (_, res) => {
  try {
    const getEmployers = await sample.sampleGet('employer');
    res.status(200).json(getEmployers);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.get('/postings', async (_, res) => {
  try {
    const getPostings = await sample.sampleGet('listings');
    res.status(200).json(getPostings);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.post('/prospects', validateProspectPost, async (req, res) => {
  try {
    const addProspect = await sample.add('prospect', req.body);
    res.status(201).json(addProspect);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.post('/employers', validateEmployerPost, async (req, res) => {
  try {
    const addEmployer = await sample.add('employer', req.body);
    res.status(201).json(addEmployer);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.post('/postings', validateListing, async (req, res) => {
  try {
    const addPosting = await sample.add('listings', req.body);
    res.status(201).json(addPosting);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

function sampleGenerator(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  };
  const options = {
    expiresIn: '15m'
  };
  return jwt.sign(payload, process.env.SECRET, options);
}

function validateRegistration(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing body' });
  } else if (!req.body.username) {
    res.status(400).json({ message: 'missing required username field' });
  } else if (req.body.password.length > 40) {
    res
      .status(400)
      .json({ message: 'password is too long (40 characters max)' });
  } else if (!req.body.password) {
    res.status(400).json({ message: 'missing required password field' });
  } else if (!req.body.role) {
    res.status(400).json({ message: 'missing required role field' });
  } else {
    next();
  }
}

function validateProspectPost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing body' });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' });
  } else if (!req.body.email) {
    res.status(400).json({ message: 'missing required email field' });
  } else if (!req.body.phone_number) {
    res.status(400).json({ message: 'missing required phone number field' });
  } else if (!req.body.job_title) {
    res.status(400).json({ message: 'missing required job title field' });
  } else if (!req.body.skills) {
    res.status(400).json({ message: 'missing required skills field' });
  } else {
    next();
  }
}

function validateListing(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing body' });
  } else if (!req.body.company) {
    res.status(400).json({ message: 'missing required name field' });
  } else if (!req.body.position) {
    res.status(400).json({ message: 'missing required position field' });
  } else if (!req.body.req_skills) {
    res.status(400).json({ message: 'missing required req skills field' });
  } else if (!req.body.bonus_skills) {
    res.status(400).json({ message: 'missing required bonus skills field' });
  } else {
    next();
  }
}

function validateEmployerPost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing body' });
  } else if (!req.body.company_name) {
    res.status(400).json({ message: 'missing required company name field' });
  } else if (!req.body.about_us) {
    res.status(400).json({ message: 'missing required about field' });
  } else {
    next();
  }
}

module.exports = router;
