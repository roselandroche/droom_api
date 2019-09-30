const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const auth = require('../auth/auth-middleware.js');
require('dotenv').config();

// Routers
const authRouter = require('../auth/auth-router.js');
const employeeRouter = require('../routes/employee-router.js');
const employerRouter = require('../routes/employer-router');

// Sample router for frontend development, not protected
const sampleRouter = require('../routes/sample-data-router');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

// Sample route for frontend development, not protected
server.use('/api/sample', sampleRouter);

// Routes
server.use('/api/auth', authRouter);
server.use('/api/droom', auth.restrict, employeeRouter);
server.use('/api/company', auth.restrict, employerRouter);

server.get('/', (_, res) => {
  res.send({ message: 'DROOM API' });
});

module.exports = server;
