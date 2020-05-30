"use strict";

import Home         from './views/pages/Home.js'

import Navbar       from './views/components/Navbar.js'
import Header       from './views/components/Header.js'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'             : Home
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
      
    // Lazy load view element:
    const navbar = null || document.getElementById('navbar');
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');

    navbar.innerHTML = await Navbar.render();
    await Navbar.after_render();

    header.innerHTML = await Header.render();
    await Header.after_render();
    
    /*
    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead

    let page = routes[parsedURL] ? routes[parsedURL] : Error404    */
    content.innerHTML = await Home.render();
    await Home.after_render();
    
    
  
}
// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
