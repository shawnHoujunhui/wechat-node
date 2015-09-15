var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//wechat
var wechat = require('wechat');
var config = {
  token: 'wechat-node',
  appid: 'wxce1fff14f1989d01',
  appsecret: 'ccead13545ece0ea702c1d158a339b33'
};

app.use(express.query());
app.use('/wechat', wechat(config, wechat.text(function (message, req, res, next) {
  res.reply('text');
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
})));


module.exports = app;
