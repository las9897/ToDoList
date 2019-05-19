//app.js

// module configure
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// bodyParser configure
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// view configure
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

// router configure
var router = require('./routes')(app, Todo);

// run server
var server = app.listen(8080, function(){
    console.log("Express server has started on port " + 8080);
});