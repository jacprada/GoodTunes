// Setting and exporting user controller based on model
var express = require('express');
var router  = express.Router();
var User    = require('../models/user');

// User Index (with Error Handling)
router.get('/', function(req, res){
  User.find(function(error, users){
    if (error) return res.status(404).send({message: 'There are no users in the database.'});
    return res.status(200).send(users);
  })
});

// User New (with Error Handling)
router.post('/', function(req, res){
  var user = new User(req.body);
  user.save(function(error){
    if (error) return res.status(403).send({message: "Unable to create user."});
      return res.status(200).send(user);
  })
});

// User Show (with Error Handling)
router.get('/:id', function(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user){
    if (error) return res.status(404).send({message: 'The user does not exist.'});
      return res.status(200).send(user);
  })
});

// User Update (with Error Handling)
router.post('/:id', function(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user) {
    if (error) return res.status(404).send({message: 'The user does not exist.'});
    if (req.body.username) user.username   = req.body.username;
    if (req.body.email) user.email         = req.body.email;
    user.save(function(error) {
      if (error) return res.status(500).send({message: "There seems to be an error in updating your user."});
        return res.status(200).send(user);
    })
  })
});

// User Delete (with Error Handling)
router.delete('/:id', function(req, res){
  var id = req.params.id;
  User.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: 'Sorry, no user with that ID.'});
      res.status(204);
  })
  return;
});

module.exports = router;