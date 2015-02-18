'use strict';

var events = require('../models/events');
var validator = require('validator');

// Date data that would be useful to you
// completing the project These data are not
// used a first.
//
var allowedDateInfo = {
  month: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  minute: [0, 30],
  hour: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ],
  year: [2015, 2016],
  day: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ]
};

var URLstandards = { 
  protocols: ['http','https'], 
  require_tld: true, 
  require_protocol: true, 
  allow_underscores: true, 
  host_whitelist: false, 
  host_blacklist: false, 
  allow_trailing_dot: false
};

/**
 * Controller that renders a list of events in HTML.
 */
function listEvents(request, response) {
  var contextData = {
    'title': 'Events',
    'past': events.past(),
    'events': events.upcoming()
  };
  response.render('event.html', contextData);
}

/**
 * Controller that renders a page for creating new events.
 */
function newEvent(request, response){
  var contextData = {
    'title': 'Create New Event'
  };
  response.render('create-event.html', contextData);
}

/**
 * Controller to which new events are submitted.
 * Validates the form and adds the new event to
 * our global list of events.
 */
function saveEvent(request, response){
  var contextData = {
    errors: [],
    title: 'Create New Event'
  };

  if (validator.isLength(request.body.title, 5, 50) === false) {
    contextData.errors.push('Your title should be between 5 and 50 letters.');
  }
  
  if (validator.isLength(request.body.location, 5, 50) === false) {
    contextData.errors.push('Your location should be between 5 and 50 letters.');
  }
  
  if (validator.isInt(request.body.day) === false) {
    contextData.errors.push('Your date should be an integer.');
  }
  
  if (validator.isIn(request.body.day,allowedDateInfo.day) === false) {
    contextData.errors.push('Your date should be between 1 and 31.');
  }
  
  if (validator.isIn(request.body.month,allowedDateInfo.month) === false) {
    contextData.errors.push('Month must be between 0 and 11.');
  }
  
  if (validator.isIn(request.body.minute,allowedDateInfo.minute) === false) {
    contextData.errors.push('Minute must be 0 or 30.');
  }

  if (validator.isIn(request.body.hour,allowedDateInfo.hour) === false) {
    contextData.errors.push('Hours must be an integer between 0 and 23.');
  }
  
  if (validator.isIn(request.body.year,allowedDateInfo.year) === false) {
    contextData.errors.push('Year must be 2015 or 2016.');
  }
  
  if (validator.isInt(request.body.year) === false) {
    contextData.errors.push('Your year should be an integer.');
  }
  
  if (validator.isURL(request.body.image,URLstandards) === false) {
    contextData.errors.push('You have entered an invalid URL.');
  }

  if ((validator.matches(request.body.image,'.gif') || validator.matches(request.body.image,'.png')) === false) {
    contextData.errors.push('Your image must be either a GIF or PNG.');
  }

  if (contextData.errors.length === 0) {
    var newEvent = {
      id: events.all.length,
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date: new Date(),
      attending: []
    };
    newEvent.date.setMinutes(request.body.minute);
    newEvent.date.setHours(request.body.hour);
    newEvent.date.setDate(request.body.day);
    newEvent.date.setMonth(request.body.month);
    newEvent.date.setFullYear(request.body.year);
    events.all.push(newEvent);
    response.redirect('/events/' + newEvent.id);
  }
  else {
    response.render('create-event.html', contextData);
  }
}

function eventDetail (request, response) {
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }
  response.render('event-detail.html', {event: ev});
}

function rsvp (request, response){
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }

  var contextData = {
    errors: [], 
    event: ev
  };

  if (validator.isEmail(request.body.email) === false) {
    contextData.errors.push('You must enter a valid email address.');
  }
  else if ((request.body.email.toLowerCase().indexOf('@yale.edu', request.body.email.length - '@yale.edu'.length) !== -1) === false) {
    contextData.errors.push('You must enter a Yale email address.');
  }
  
  if (contextData.errors.length === 0) {
    ev.attending.push(request.body.email);
    response.redirect('/events/' + ev.id);
  }
  else {
    response.render('event-detail.html', contextData);    
  }

}

function eventAPI (request, response){  
  if (typeof(request.query.search) === "undefined") {
    response.send(JSON.stringify({events: events.all},null,'\t'));
  }
  else {
    var results = events.search(request.query.search);
    response.send(JSON.stringify({events: results},null,'\t'));
  } 
}

function donate(request, response){
  var contextData = {
    'title': 'Donate'
  };
  response.render('donate.html', contextData);
}

/**
 * Export all our functions (controllers in this case, because they
 * handles requests and render responses).
 */
module.exports = {
  'listEvents': listEvents,
  'eventDetail': eventDetail,
  'newEvent': newEvent,
  'saveEvent': saveEvent,
  'rsvp': rsvp,
  'eventAPI': eventAPI,
  'donate': donate
};