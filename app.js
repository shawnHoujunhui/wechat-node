var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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

//wechat
var wechat = require('wechat');
var config = {
  token: 'wechat-node',
  appid: 'wxce1fff14f1989d01',
  encodingAESKey: 'encodinAESKey'
};

app.use(express.query());
app.use('/wechat', wechat('wechat-node').text(function (message, req, res, next) {
  res.reply({
    type: "text",
    content: 'Hello world!'
  });
  //res.reply([
  //  {
  //    title: 'title',
  //    description: 'description',
  //    picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
  //    url: 'http://nodeapi.cloudfoundry.com/'
  //  }
  //]);
}).image(function (message, req, res, next) {
  res.reply('image');
}).voice(function (message, req, res, next) {
  res.reply('voice');
}).video(function (message, req, res, next) {
  res.reply('video');
}).location(function (message, req, res, next) {
  res.reply('location');
}).link(function (message, req, res, next) {
  res.reply('link');
}).event(function (message, req, res, next) {
  res.reply('event');
}).device_text(function (message, req, res, next) {
  res.reply('device_text.');
}).device_event(function (message, req, res, next) {
  if (message.Event === 'subscribe_status' || message.Event === 'unsubscribe_status') {s
    res.reply(1);
  } else {
    res.reply('device_event.')
  }
}).middlewarify());


module.exports = app;
