// Here we are requiring path, mongoose, express, and body parser
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");


//connect to the correct database
mongoose.connect('mongodb://localhost/mongoose');
mongoose.connection.on('error', function(err){});


var MongooseSchema = new mongoose.Schema({
	name: String, 
	weight: Number, 
	type: String
})

// Establishing validations 
MongooseSchema.path('name').required(true, "Name cannot be blank");
MongooseSchema.path('weight').required(true, "Quotes cannot be blank");
MongooseSchema.path('type').required(true, "type cannot be blank");

var Mongoose = mongoose.model('Mongoose', MongooseSchema);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "/.static")));


// We are establishing the route to our view page
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// routing back to /routes/index.ejs
var route = require('./routes/index.ejs')(app, Mongoose);

//setting the server to run on port 8000
app.listen(8000, function(){
	console.log("listening to port 8000");
})


