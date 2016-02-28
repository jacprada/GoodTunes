// Setting and exporting router for startups, community members, auth and users controllers 
var express = require('express');
var router  = express.Router();

router.use('/api/auth', require('./authenticationController'));
router.use('/api/users', require('./usersController'));
router.use('/api/albums', require('./albumsController'));

module.exports = router;