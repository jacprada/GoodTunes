// Setting and exporting mongoose model for music album
var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
  title: String,
  artist: String, // Maybe set as relational model
  year: Number,
  label: String,

  tags: String, // Set as an array of tags

  rating: Number,
  review: String,

  link: {
    facebook: String,
    spotify:  String,
    amazon: String,
  },

  user: String, // Definitely set as relational model
});

var Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;