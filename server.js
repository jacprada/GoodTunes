// Saving dependencies into variables to make them accessible
var express           = require('express');
var app               = express();
var cors              = require('cors');
var bodyParser        = require('body-parser');
var morgan            = require('morgan');
var mongoose          = require('mongoose');

// Setting view folder and serving files from the public folder
app.set("views", "./public");
app.use(express.static(__dirname + '/public'));

// Setting body parsing middleware for json and URL-encoded data 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Setting local and online database
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems'
mongoose.connect(databaseURL);

// Setting cors middleware and HTTP request logger middleware
app.use(cors());
app.use(morgan('dev'));