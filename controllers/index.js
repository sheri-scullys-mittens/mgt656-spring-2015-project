'use strict';

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Sheri Scully\'s Mittens',
    'tagline': 'A poor woman\'s clone of Eventbrite.'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
