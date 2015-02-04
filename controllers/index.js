'use strict';

/**
 * Controller that renders our index (home) page.
 */
function index (request, response) {
  var contextData = {
    'title': 'Home'
  };
  response.render('index.html', contextData);
}

module.exports = {
  index: index
};
