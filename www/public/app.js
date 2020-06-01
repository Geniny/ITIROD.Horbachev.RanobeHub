"use strict";

import Home from './views/pages/Home.js'
import Ranobe from './views/pages/Ranobe.js'
import Chapter from './views/pages/Chapter.js'
import Error from './views/pages/Error.js'

import Utils from './services/Utils.js'

import Navbar from './views/components/Navbar.js'
import Header from './views/components/Header.js'
import Footer from './views/components/Footer.js'


const routes = {
    '/': Home,
    '/ranobe/:id': Ranobe,
    '/ranobe/:id/chapter/:id': Chapter
};

class Main {
    constructor() 
    {
    }

    static async build() {
        const header = null || document.getElementById('header_container');
        const navbar = null || document.getElementById('navbar');
        const footer = null || document.getElementById('footer_container');

        navbar.innerHTML = await Navbar.render();
        await Navbar.after_render();
        header.innerHTML = await Header.render();
        await Header.after_render();
        footer.innerHTML = await Footer.render();
        await Footer.after_render();

        Main.router();
    }

    static async router() {
        let request = Utils.parseRequestURL()
        let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '') + (request.id2 ? '/:id' : '')
        let page = routes[parsedURL] ? routes[parsedURL] : Error; 
        const content = null || document.getElementById('page_container');
        content.innerHTML = await page.render();
        await page.after_render();
    }
}

Main.build();

window.addEventListener('hashchange', Main.router);
