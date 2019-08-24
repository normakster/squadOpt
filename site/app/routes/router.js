let express = require('express');
let router = express.Router();

// Main Route off "/squadOpt/"

const playerRoutes = require('./playerRoutes');
router.use('/player', playerRoutes);

const staticRoutes = require('./staticRoutes');
router.use('/', staticRoutes);

module.exports = router;
