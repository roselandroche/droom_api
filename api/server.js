const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const auth = require('../auth/auth-middleware.js');
const authRouter = require('../auth/auth-router.js');
const employeeRouter = require('../routes/employee-router.js');
const employerRouter = require('../routes/employer-router');
const sampleRouter = require('../models/sample-model');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/sample', sampleRouter);
server.use('/api/droom', auth.restrict, employeeRouter);
server.use('/api/company', auth.restrict, employerRouter);

server.get('/', (_, res) => {
  res.send({ message: 'DROOM API' });
});

module.exports = server;
