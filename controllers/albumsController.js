// Setting and exporting album controller based on model
var express = require('express');
var router  = express.Router();
var Album = require('../models/album');
var User = require("../models/user");

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

// Album Post (with Error Handling)
router.post('/', function(req, res){
  Album.create({
    title: req.body.title,
    artist: req.body.artist,
    year: req.body.year,
    label: req.body.label,
    tags: req.body.tags,
    rating: req.body.rating,
    review: req.body.review,
    reference: {
      facebook: req.body.reference.facebook,
      spotify:  req.body.reference.spotify,
      amazon: req.body.reference.amazon,
    },
    _reviewer: req.user._doc._id
  },function(error, album){
    if(error) return res.status(403).send({message: 'Could not create album '});
    return res.status(200).send(album);
  })
});

// Album Update (with Error Handling)
// router.put('/:id', function(req, res){
//   var id = req.params.id;
//   Album.findByIdAndUpdate(id, {
//     title: req.body.title,
//     artist: req.body.artist,
//     year: req.body.year,
//     label: req.body.label,
//     tags: req.body.tags,
//     rating: req.body.rating,
//     review: req.body.review,
//     reference: {
//       facebook: req.body.reference.facebook,
//       spotify:  req.body.reference.spotify,
//       amazon: req.body.reference.amazon,
//     },
//     _reviewer: req.user._doc._id
//   },function (error, album) {
//     if (error) return handleError(error);
//     res.send(album);
//   });
// });


// Album Update (with Error Handling)
router.put('/:id', function(req, res){
  var id = req.params.id;
  Album.findById(id, function (error, album) {
    if (error) return handleError(error);

    album.title = req.body.title;
    album.artist = req.body.artist;
    album.year = req.body.year;
    album.label = req.body.label;
    album.tags = req.body.tags;
    album.rating = req.body.rating;
    album.review = req.body.review;
    album.reference.facebook = req.body.reference.facebook;
    album.reference.spotify = req.body.reference.spotify;
    album.reference.amazon = req.body.reference.amazon;
    album._reviewer = req.user._doc._id;

    album.save(function (error) {
      if (error) return handleError(error);
      res.send(album);
    });
  });
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