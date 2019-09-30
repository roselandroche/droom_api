const yup = require('yup');
const Users = require('../models/user-model');

module.exports = {
  generator,
  restrict,
  validateListing
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

async function validateListing(req, res, next) {
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

// if jwt decoded company token's ID doesn't match the company ID of the post slotted for deletion, an error that says
// that listing does not belong to you should be emitted

// same idea should be applied to users posting, companies deleting, etc.
