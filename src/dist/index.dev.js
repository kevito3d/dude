"use strict";

var express = require("express");

var engine = require('ejs-mate');

var morgan = require('morgan');

var path = require('path');

var session = require('express-session'); //routes


var index = require('./routes/index');

var user = require('./api/routes/user');

var institution = require('./api/routes/institution');

var area = require('./api/routes/area'); //initializations


var app = express();

require('./database'); //settings


app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(express["static"](__dirname + '/public')); //middelwares

app.use(morgan('short'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(session({
  secret: "my secret key joptionpane",
  resave: false,
  saveUninitialized: false
})); //routes

app.use('/', index);
app.use('/api/user', user);
app.use('/api/institution', institution);
app.use('/api/area', area); //startin server

app.listen(app.get('port'), function () {
  console.log('server on Port ', app.get('port'));
});