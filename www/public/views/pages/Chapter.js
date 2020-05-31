"use strict";

import Utils from './../../services/Utils.js'

class Chapter {

    constructor() {
        this.chapter = null;
        this.ranobe = null;
        this.request = null;
        this.translates = null;
      }
    
      async render() 
      {
        this.request = Utils.parseRequestURL();
        let ranobeRef =  firebase.firestore().collection("ranobes").doc(this.request.id);
        let chapterRef = ranobeRef.collection('chapters').doc(this.request.id2);
        this.ranobe = await ranobeRef.get();
        this.chapter = await chapterRef.get();
        this.translates = await chapterRef.collection("translates").get();

        let view =
        ` 
        
        <main id="chapterPage">
            <div class="chapter-header">
                <a href="#/ranobe/${this.ranobe.id}" class="ranobe-name">${this.ranobe.data().name}</a>
                <div class="chapter-name"></div>
            </div>
            <div class="chapter-versions">
            </div>
            <hr>
        </main>
        `
        return view;
      }

      async after_render()
      {
        let chapterName = document.getElementsByClassName("chapter-name")[0];
        let chapterVersions = document.getElementsByClassName("chapter-versions")[0];
        let chapterPage = document.getElementById('chapterPage');
        chapterName.innerHTML = this.chapter.data().name;

        let text = document.createElement('div');
        text.style.display = 'block';
        text.className = 'chapter-text';
        text.setAttribute('id',0 + '-text');   
        text.innerHTML = "some text";
        chapterPage.appendChild(text); 

        this.translates.forEach( element => {

            let span = document.createElement('span');
            span.className = 'chapter-version';
            span.setAttribute('id',element.id);
            span.addEventListener ("click",  () => {
                chapterPage.removeChild(document.getElementsByClassName('chapter-text')[0]);
                let text = document.createElement('div');
                text.style.display = 'block';
                text.className = 'chapter-text';
                text.setAttribute('id',element.id + '-text');   
                text.innerHTML = element.data().text;
                chapterPage.appendChild(text); 
            });
            span.innerHTML = element.data().name;
            chapterVersions.appendChild(span);
        });
      }
}

export default new Chapter();