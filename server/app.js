var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const fs = require('fs');
const words = fs.readFileSync('./public/words.txt','utf8').split("\n");
const size = words.length;

app.get('/getword', (req, res) => {
    var index = Math.floor(Math.random() * size);
    var curWord = words[index];
    res.send(curWord);
});


module.exports = app;