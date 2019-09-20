const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const sampleRouter = require('../dreams/sample-data-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/sample', sampleRouter);

server.get('/', (req, res) => {
  res.send({ message: 'DROOM API' });
});

module.exports = server;
