var express = require('express');
var app = express();
var api = require('./api/api');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var auth = require('./auth/routes');



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('mongoose').connect('mongodb://localhost:27017/nodeblog', {useNewUrlParser: true})

app.use('/api', api);
app.use('/auth', auth);


module.exports = app;

