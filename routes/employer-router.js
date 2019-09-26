const router = require('express').Router();
const Company = require('../models/company-model');
const Listing = require('../models/listings-model');

router.get('/', async (_, res) => {
  try {
    const getCompanies = await Company.getCompanies();
    res.status(200).json(getCompanies);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.get('/:id/', async (req, res) => {
  const { id } = req.params;
  try {
    const getCompany = await Company.singleCompany(id);
    res.status(200).json(getCompany);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.get('/jobs', async (_, res) => {
  try {
    const getListings = await Listing.getListings();
    res.status(200).json(getListings);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.get('/:id/job', async (req, res) => {
  const { id } = req.params;
  try {
    const getListing = await Listing.getListing(id, req.body);
    res.status(200).json(getListing);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.post('/job', async (req, res) => {
  try {
    const post = await Listing.addListing(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.post('/profile', async (req, res) => {
  try {
    const profile = await Company.addProfile(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.put('/:id/profile', async (req, res) => {
  const { id } = req.params;
  try {
    const update = await Company.updateProfile(id, req.body);
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.put('/:id/job', async (req, res) => {
  const { id } = req.params;
  try {
    const update = await Listing.updateListing(id, req.body);
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.delete('/:id/job', async (req, res) => {
  const { id } = req.params;
  try {
    const destroy = await Listing.deleteListing(id);
    res.status(204).json(destroy);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

module.exports = router;
