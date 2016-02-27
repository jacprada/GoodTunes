// Setting and exporting router for startups, community members, auth and users controllers 
var express = require('express');
var router  = express.Router();

// router.use('/api/startups', require('./startupController'));
// router.use('/api/community', require('./communityMemberController'));
router.use('/api/auth', require('./authenticationController'));
router.use('/api/users', require('./usersController'));

module.exports = router;