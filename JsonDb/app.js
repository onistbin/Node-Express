'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var db = require('./db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//使用会话
app.use(session({
    secret: 'keyboard cat'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index', {
        list: db.list,
        logined: req.session.logined
    });
});


//增加功能
app.post('/add', function(req, res) {
  db.add({title: req.body.title});
  res.redirect('/');
});

app.get('/get/:index', function(req, res) {

    var index = req.params.index;
    var article = db.get(index);

    res.send(article);
});


//删除功能
app.get('/del', function(req, res) {

    let index = req.query.index;
    db.del(index);
    res.redirect('/');
});


//修改功能
app.post('/update', function(req, res) {

  var index = req.body.index;
  var title = req.body.title;
  db.update(index, {title});
  res.redirect('/');
});



//登陆功能
app.post('/login', function(req, res) {

    let loginname = req.body.loginname;
    let password = req.body.password;

    if(loginname === 'wangjianbing' && password === '123') {

        req.session.logined = true;
        res.send('success');
    } else {
        res.send('error');
    }
});

//退出功能
app.get('/logout', function(req, res) {

    req.session.logined = false;
    res.redirect('/');
    res.send();
});












// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
