const router = require('express').Router();
const Prospect = require('../models/prospect-model');

const jwt = require('jsonwebtoken');

// Returns all job listings, ***Prospect ONLY***
router.post('/profile', async (req, res) => {
  const token = req.headers.authorization;
  const { role } = jwt.decode(token);

  if (role === 'employee') {
    const profile = await Prospect.addProfile(req.body);
    res.status(201).json(profile);
  } else {
    res
      .status(401)
      .json({ message: 'You are not authorized to make this action' });
  }
});

// Returns all job listings, ***Prospect ONLY***
router.put('/:id/profile', async (req, res) => {
  const token = req.headers.authorization;
  const { role } = jwt.decode(token);
  const { id } = req.params;

  if (role === 'employee') {
    const update = await Prospect.updateProfile(id, req.body);
    res.status(200).json(update);
  } else {
    res
      .status(401)
      .json({ message: 'You are not authorized to make this action' });
  }
});

// Returns all prospects, ***Employer ONLY***
router.get('/', async (req, res) => {
  const token = req.headers.authorization;
  const { role } = jwt.decode(token);

  if (role === 'employer') {
    const getProspects = await Prospect.getProspects();
    res.status(200).json(getProspects);
  } else {
    res
      .status(401)
      .json({ message: 'You are not authorized to make this action' });
  }
});

// Returns single prospect, ***Employer ONLY***
router.get('/:id', async (req, res) => {
  const token = req.headers.authorization;
  const { role } = jwt.decode(token);
  const { id } = req.params;

  if (role === 'employer') {
    const getProspect = await Prospect.singleProspect(id);
    res.status(200).json(getProspect);
  } else {
    res
      .status(401)
      .json({ message: 'You are not authorized to make this action' });
  }
});

module.exports = router;
