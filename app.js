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
  token: 'node',
  appid: 'wx86d16afcfdc1afc6',
  appsecret: 'bce57bdc8b5f4ab2efda5523d32d1e72',
  encodingAESKey: 'yfZq2Zy1xmSoZafw7yNdBHXXvZhnqlvgpo6d62YieqI'
};

app.use(express.query());

app.use('/token', wechat(config, function (req, res, next) {
  res.reply('success');
}));

app.use('/wechat', wechat('some token', wechat.text(function (message, req, res, next) {
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
  res.reply('device_text');
}).device_event(function (message, req, res, next) {
  res.reply('device_event');
})));


module.exports = app;
