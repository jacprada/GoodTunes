var express           = require('express');
var app               = express();
var cors              = require('cors');
var bodyParser        = require('body-parser');
var morgan            = require('morgan');
var mongoose          = require('mongoose');

app.set("views", "./public");
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));