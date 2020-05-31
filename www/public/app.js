"use strict";

import Home         from './views/pages/Home.js'
import Ranobe       from './views/pages/Ranobe.js'
import Chapter       from './views/pages/Chapter.js'
import Error       from './views/pages/Error.js'

import Utils        from './services/Utils.js'

import Navbar       from './views/components/Navbar.js'
import Header       from './views/components/Header.js'
import Footer       from './views/components/Footer.js'


const routes = {
    '/'             : Home,
    '/ranobe/:id'       : Ranobe,
    '/ranobe/:id/chapter/:id' : Chapter
};

const router = async () => {
    const header = null || document.getElementById('header_container');
    const navbar = null || document.getElementById('navbar');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    navbar.innerHTML = await Navbar.render();
    header.innerHTML = await Header.render();
    footer.innerHTML = await Footer.render();
    await Header.after_render();
    await Footer.after_render();
    await Navbar.after_render();

    
    
    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '') + (request.id2 ? '/:id' : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error;
    content.innerHTML = await page.render();
    await page.after_render();
    
    
  
}
// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
