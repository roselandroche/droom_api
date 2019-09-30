const jwt = require('jsonwebtoken');
const yup = require('yup');
const Users = require('../models/user-model');

module.exports = {
  generator,
  restrict,
  validateRegistration
};

const user = yup.object({
  username: yup.string().required('Field `username` is required!'),
  password: yup
    .string()
    .ensure()
    .min(8)
    .max(40)
    .required('Field `password` is required!'),
  role: yup
    .string()
    .oneOf(['employee', 'employer'])
    .required(
      'Field `role` is required and must be either employee or employer'
    )
});

// Sets our payload and options then signs a token using the payload, our environment secret, and options.
function generator(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  };
  const options = {
    expiresIn: '8h'
  };
  return jwt.sign(payload, process.env.SECRET, options);
}

// if no error occurs and the token is verified it sends a decoded token to the user and moves next.
// If there is no token at all, an error message tells the user no token was provided.
function restrict(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'YOU SHALL NOT PASS! 🧙‍' });
      } else {
        req.decoded = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
}

async function validateRegistration(req, res, next) {
  try {
    await user.validate(req.body);

    const username = await Users.getUsername(req.body.username);

    if (username) {
      res.status(400).json({
        message: `The user: ${req.body.username} already has an account`
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
