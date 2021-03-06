const router = require('express').Router();
const bcrypt = require('bcrypt');
const middleware = require('./auth-middleware');
const Users = require('../models/user-model');

const { validateRegistration } = middleware;

router.post('/register', validateRegistration, (req, res) => {
  // Destructures body into user
  const user = req.body;
  // Takes users password and encrypts
  user.password = bcrypt.hashSync(user.password, 12);

  // Using the helper function add, we send the user object to the database, then we send the user a response
  // Introducing them to our dadjoke hellscape
  Users.addUser(user)
    .then(savedUser => {
      const { username } = savedUser;
      res.status(201).json({ message: `Good luck, ${username}` });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // Destructing username and password from request body
  const { username, password } = req.body;

  // Using our helper function to filter to find a user matching our username, if that user exists and the password
  // matches using bcrypts compareSync function the user is issued a token using our middleware generator function. The user is then
  // returned an object with a welcome back message and the token. If either the user does not exist or the password cannot be verified
  // YOU SHALL NOT PASS! if something weird happens we send them ol' reliable status500.
  Users.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = middleware.generator(user);
        res
          .status(200)
          .json({ message: `Welcome Back ${user.username}`, token });
      } else {
        res.status(401).json({ message: 'You shall not pass! 🧙‍' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
