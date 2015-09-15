var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "sessionSecret", key: "sessionKey", cookie: { secure: true }}));
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

var List = require('wechat').List;
List.add('view', [
  ['回复{a}查看我的性别', function (info, req, res) {
    res.reply('我是个妹纸哟');
  }],
  ['回复{b}查看我的年龄', function (info, req, res) {
    res.reply('我今年18岁');
  }],
  ['回复{c}查看我的性取向', '这样的事情怎么好意思告诉你啦- -']
]);

//被动调用
app.use('/wechat', wechat(config, wechat.text(function (message, req, res, next) {
  if(message.Content === 'list'){
    res.wait('view');
  }else{
    res.reply('text');
  }
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
  if (message.Event === 'subscribe_status' || message.Event === 'unsubscribe_status') {
    res.reply("订阅事件");
  } else {
    res.reply('自定义菜单点击事件')
  }
})));

//主动调用
var WechatAPI = require('wechat-api');

var api = new WechatAPI('wx86d16afcfdc1afc6', 'bce57bdc8b5f4ab2efda5523d32d1e72');

module.exports = app;