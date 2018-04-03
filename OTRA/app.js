'use strict'
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const hbs = require('hbs')

var movieRouter = require('./routes/routes_filme');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/SearchMenu',(req, resp, next) =>{
  resp.setHeader('Content-Type', 'text/html')

resp.render('mainframe', {layout : false})
})

app.use(movieRouter);

app.use(function(req, res, next){
  var err= new Error('Not Found')
  res.status = 404
  next(err)
})

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
