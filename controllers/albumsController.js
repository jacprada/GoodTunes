// Setting and exporting album controller based on model
var express = require('express');
var router  = express.Router();
var Album = require('../models/album');

// Album Index (with Error Handling)
router.get('/', function(req, res){
  Album.find()
  .populate('_reviewer')
  .exec(function(error, albums){
    if(error)return res.status(404).json({message: 'Could not find any album'});
      return res.status(200).send(albums);
  })
});

// Album Show (with Error Handling)
router.get('/:id', function(req,res){
  var id = req.params.id;
  Album.findById({_id: id})
  .populate('_reviewer')
  .exec(function(error, album){
    if(error) return res.status(404).send({message: 'Could not find album'});
      return res.status(200).send(album || {message: 'Sorry, no album with that ID.'});
  })
});

// Album Delete (with Error Handling)
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Album.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: 'Sorry, no album with that ID.'});
      return res.status(200).send({message: 'Album deleted from database.'});
  })
});

module.exports = router