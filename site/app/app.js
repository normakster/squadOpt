var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var debug = require('debug')('app');


const config = require('../config/config.js');
// const util = require('./controllers/utilCtrl');
const router = require('./routes/'+config.project.router);

// util.connectDB();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/public/css'));//stylesheets
app.use('/js', express.static(__dirname + '/public/js'));

// Display config
app.get('/config', function(req, res, next) {
  console.log(config);
  var obj = config;
  res.json(obj);
});
// FRONTEND
app.get('/test', (req, res) => {
  res.send('Hello world\n');
})

// Routes
// app.use('/api/'+config.project.name, apiRouter);
app.use('/'+config.project.name+'/', router);
// app.use('/'+config.project.name, router);

// catch favicon requests and respond
app.use('/favicon.ico', (req, res) => res.status(204));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
