'use strict';

/**
 * An Array of all the events
 */
var allEvents = [
  {
    id: 0,
    title: 'SOM House Party',
    // Note that JavaScript months are zero-indexed,
    // so, month zero is January. This is Jan 17th
    // 2013 at 4:30pm local time.
    date:   new Date(2016, 0, 17, 16, 30, 0),
    image: 'http://i.imgur.com/pXjrQ.gif',
    location: 'Kyle \'s house',
    attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu']
  },
  {
    id: 1,
    title: 'BBQ Party for Hackers and Nerds',
    date:   new Date(2015, 8, 1, 19, 0, 0),
    image: 'http://i.imgur.com/7pe2k.gif',
    location: 'Miles\' house',
    attending: ['kyle.jensen@yale.edu', 'kim.kardashian@yale.edu']
  },
  {
    id: 2,
    title: 'BBQ for Managers',
    date:   new Date(2014, 9, 20, 18, 0, 0),
    image: 'http://i.imgur.com/CJLrRqh.gif',
    location: 'Barry Nalebuff\'s house',
    attending: ['kim.kardashian@yale.edu']
  },
  {
    id: 3,
    title: 'Cooking Lessons for the Busy Business Student',
    date:   new Date(2014, 8, 2, 19, 0, 0),
    image: 'http://i.imgur.com/02KT9.gif',
    location: 'Yale Farm',
    attending: ['homer.simpson@yale.edu']
  },
  {
    id: 4,
    title: 'Lunch with the SOM Administrators',
    date:   new Date(2015, 3, 2, 19, 0, 0),
    image: 'http://33.media.tumblr.com/tumblr_lx9iv9EkzT1qb9pa3o1_500.gif',
    location: 'The best table, obvi',
    attending: ['sheri.scully@yale.edu']
  },
  {
    id: 5,
    title: 'Sheri\'s Birthday',
    date:   new Date(2015, 7, 2, 18, 0, 0),
    image: 'http://31.media.tumblr.com/1cdd8c8f234fe094ff3dbe390f6d965f/tumblr_mn6m44SWtr1ql5yr7o1_500.gif',
    location: 'Evans Hall',
    attending: ['sheri.scully@yale.edu']
  },
  {
    id: 6,
    title: 'Dance Lessons',
    date:   new Date(2015, 2, 27, 15, 0, 0),
    image: 'http://static4.worldofwonder.net/wp-content/uploads/2013/12/tumblr_mx27ixtBX51qhgul8o1_400.gif',
    location: 'Beinecke',
    attending: ['homer.simpson@yale.edu', 'sheri.scully@yale.edu']
  },
  {
    id: 7,
    title: 'Rager at Sheri\'s House',
    date:   new Date(2015, 3, 21, 19, 0, 0),
    image: 'http://data2.whicdn.com/images/43787490/large.gif',
    location: 'Sheri\'s House',
    attending: ['homer.simpson@yale.edu', 'sheri.scully@yale.edu']
  },
  {
    id: 8,
    title: 'Night at the Opera',
    date:   new Date(2015, 4, 29, 19, 0, 0),
    image: 'http://media.giphy.com/media/Ily8VkSEK6SB2/giphy.gif',
    location: 'The Shubert Theater',
    attending: ['sheri.scully@yale.edu']
  }
];


/**
 * Returns the first event that has a particular id.
 */
function getById (id) {
  for (var i = allEvents.length - 1; i >= 0; i--) {
    if (id === allEvents[i].id){
      return allEvents[i];
    }
  }
  return null;
}

function search (query) {
  
  var results = [];
  
  for(var i=0; i<allEvents.length; i++) {
    if(allEvents[i].title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
      results.push(allEvents[i]);
    }
  }
  
  return results;
}

function upcoming () {
  
  var today = new Date();
  
  var results = [];
  
  for(var i=0; i<allEvents.length; i++) {
    if(allEvents[i].date >= today) {
      results.push(allEvents[i]);
    }
  }
  
  return results;
}

module.exports = exports = {
  all: allEvents,
  getById: getById,
  search: search,
  upcoming: upcoming
};