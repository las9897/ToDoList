//app.js

// [load package]
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');




// [configure]
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// view setting
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


// connect to mongoDB server
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    //connected to mongoDB server
    console.log("Connected to mongod server"); 
});
mongoose.connect('mongodb://localhost/todolist', {useNewUrlParser: true});
// TODO MODEL
var Todo = require('./models/todo');

// [configure router]
var router = require('./routes')(app, Todo);

// [configure server port]
var port = process.env.PORT || 8080;

// [run server]
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port);
    
});