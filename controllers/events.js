'use strict';

var events = require('../models/events');
var validator = require('validator');

// Date data that would be useful to you
// completing the project These data are not
// used a first.
//
var allowedDateInfo = {
  /*months: {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  },*/
  months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  minutes: [0, 30],
  hours: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ],
  years: [2015, 2016]
};

/**
 * Controller that renders a list of events in HTML.
 */
function listEvents(request, response) {
  var currentTime = new Date();
  var contextData = {
    'title': 'Events',
    'events': events.all,
    'time': currentTime
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
    title: "Create New Event"
  };

  if (validator.isLength(request.body.title, 5, 50) === false) {
    contextData.errors.push('Your title should be between 5 and 50 letters.');
  }
  
  if (validator.isLength(request.body.location, 5, 50) === false) {
    contextData.errors.push('Your location should be between 5 and 50 letters.');
  }
  
  if (validator.isInt(request.body.days) === false) {
    contextData.errors.push('Your date should be an integer.');
  }
  
  if (validator.isLength(request.body.days, 1, 31) === false) {
    contextData.errors.push('Your date should be between 1 and 31.');
  }
  
  if (validator.isIn(request.body.months,allowedDateInfo.months) === false) {
    contextData.errors.push('Month must be between 0 and 11.');
  }
  
  if (validator.isIn(request.body.minutes,allowedDateInfo.minutes) === false) {
    contextData.errors.push('Minutes must be 0 or 30.');
  }

  if (validator.isIn(request.body.hours,allowedDateInfo.hours) === false) {
    contextData.errors.push('Hours must be an integer between 0 and 23.');
  }
  
  if (validator.isIn(request.body.years,allowedDateInfo.years) === false) {
    contextData.errors.push('Year must be 2015 or 2016.');
  }
  
   if (validator.isInt(request.body.years) === false) {
    contextData.errors.push('Your year should be an integer.');
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
    newEvent.date.setMinutes(request.body.minutes);
    newEvent.date.setHours(request.body.hours);
    newEvent.date.setDate(request.body.days);
    newEvent.date.setMonth(request.body.months);
    newEvent.date.setFullYear(request.body.years);
    events.all.push(newEvent);
    response.redirect('/events/' + newEvent.id);
  }else{
    
    response.render('create-event.html', contextData);
  }
}

function eventDetail (request, response) {
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }
  response.render('event-detail.html', ev);
}

function rsvp (request, response){
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    response.status(404).send('No such event');
  }

  if(validator.isEmail(request.body.email)){
    ev.attending.push(request.body.email);
    response.redirect('/events/' + ev.id);
  }else{
    var contextData = {errors: [], event: ev};
    contextData.errors.push('Invalid email');
    response.render('event-detail.html', contextData);    
  }

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
  'rsvp': rsvp
};