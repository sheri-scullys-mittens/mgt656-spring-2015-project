'use strict';

// Import our express and our configuration
var express = require('express');
var configure = require('./config.js');

// Import our controllers
var indexControllers = require('./controllers/index.js');
var aboutControllers = require('./controllers/about.js');
var eventControllers = require('./controllers/events.js');


// Create our express app
var app = express();

// Configure it
configure(app);

// Add routes mapping URLs to controllers
app.get('/', indexControllers.index);
app.get('/about', aboutControllers.about);
app.get('/events', eventControllers.listEvents);
app.get('/events/new', eventControllers.newEvent);
app.post('/events/new', eventControllers.saveEvent);
app.get('/events/:id', eventControllers.eventDetail);
app.get('/events/:id/donate', eventControllers.donate);
app.post('/events/:id', eventControllers.rsvp);
app.get('/api/events', eventControllers.eventAPI);


module.exports = app;