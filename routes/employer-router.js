const router = require('express').Router();
const Company = require('../models/company-model');
const Listing = require('../models/listings-model');

const jwt = require('jsonwebtoken');

// Returns all job listings, ***Global***
router.get('/jobs', async (_, res) => {
  try {
    const getJobs = await Listing.getListings();
    res.status(200).json(getJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

// Returns all job listings by a single company, ***Global***
router.get('/:id/job', async (req, res) => {
  const { id } = req.params;
  try {
    const getListing = await Listing.getListing(id, req.body);
    res.status(200).json(getListing);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

// posts new job listing, ***Employer ONLY***
router.post('/job', async (req, res) => {
  const token = req.headers.authorization;
  const { role } = jwt.decode(token);

  if (role === 'employer') {
    const post = await Listing.addListing(req.body);
    res.status(200).json(post);
  } else {
    res
      .status(401)
      .json({ message: 'You are not authorized to make this action' });
  }
});

// posts profile, ***Employer ONLY***
router.post('/profile', async (req, res) => {
  const token = req.headers.authorization;
  const { role } = jwt.decode(token);

  if (role === 'employer') {
    const profile = await Company.addProfile(req.body);
    res.status(201).json(profile);
  } else {
    res
      .status(401)
      .json({ message: 'You are not authorized to make this action' });
  }
});

// updates company profile, ***Employer ONLY***
router.put('/:id/profile', async (req, res) => {
  const token = req.headers.authorization;
  const { role } = jwt.decode(token);
  const { id } = req.params;

  if (role === 'employer') {
    const update = await Company.updateProfile(id, req.body);
    res.status(200).json(update);
  } else {
    res
      .status(401)
      .json({ message: 'You are not authorized to make this action' });
  }
});

// updates job listing, ***Employer Only***
router.put('/:id/job', async (req, res) => {
  const token = req.headers.authorization;
  const { role } = jwt.decode(token);
  const { id } = req.params;

  if (role === 'employer') {
    const update = await Listing.updateListing(id, req.body);
    res.status(200).json(update);
  } else {
    res
      .status(401)
      .json({ message: 'You are not authorized to make this action' });
  }
});

// deletes job listing, ***Employer Only***
router.delete('/:id/job', async (req, res) => {
  const token = req.headers.authorization;
  const { role } = jwt.decode(token);
  const { id } = req.params;

  if (role === 'employer') {
    const destroy = await Listing.deleteListing(id);
    res.status(204).json(destroy);
  } else {
    res
      .status(401)
      .json({ message: 'You are not authorized to make this action' });
  }
});

// Returns all companies, ***Global***
router.get('/', async (_, res) => {
  try {
    const getCompanies = await Company.getCompanies();
    res.status(200).json(getCompanies);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

// Returns single company, ***Global***
router.get('/:id/', async (req, res) => {
  const { id } = req.params;
  try {
    const getCompany = await Company.singleCompany(id);
    res.status(200).json(getCompany);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

module.exports = router;
