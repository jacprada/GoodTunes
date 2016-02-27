// Setting and exporting mongoose model for music album
var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  year: Number,
  label: String,
  tags: [String],
  rating: Number,
  review: String,
  reference: {
    facebook: String,
    spotify:  String,
    amazon: String,
  },
  _reviewer: { type: mongoose.Schema.ObjectId, ref: 'User' } 
});

var Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;