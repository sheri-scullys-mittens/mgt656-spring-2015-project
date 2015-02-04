'use strict';

/**
 * Controller that renders our about page.
 */
function about (request, response) {
  var contextData = {
    'title': 'About'
  };
  response.render('about.html', contextData);
}

module.exports = {
  about: about
};