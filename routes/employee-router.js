const router = require('express').Router();
const Prospect = require('../models/prospect-model');

router.post('/profile', async (req, res) => {
  try {
    const profile = await Prospect.addProfile(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.put('/:id/profile', async (req, res) => {
  const { id } = req.params;
  try {
    const update = await Prospect.updateProfile(id, req.body);
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.get('/', async (_, res) => {
  try {
    const getProspects = await Prospect.getProspects();
    res.status(200).json(getProspects);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const getProspect = await Prospect.singleProspect(id);
    res.status(200).json(getProspect);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

module.exports = router;
