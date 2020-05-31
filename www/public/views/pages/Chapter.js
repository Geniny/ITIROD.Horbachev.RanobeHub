"use strict";

import Utils from './../../services/Utils.js'
import Error from './../../views/pages/Error.js'

class Chapter {

    constructor() {
        this.chapter = null;
        this.ranobe = null;
        this.request = null;
        this.translates = null;
        this.view = null;
    }

    async render() {
        this.request = Utils.parseRequestURL();
        let ranobeRef = firebase.firestore().collection("ranobes").doc(this.request.id);
        let chapterRef = ranobeRef.collection('chapters').doc(this.request.id2);

        await ranobeRef.get().then(async (doc) => {
            if (doc.exists) {
                
                this.ranobe = doc;
                console.log("Document data:", doc.data());
                await chapterRef.get().then(async(cdoc) => {
                    if (cdoc.exists) {
                        console.log("Document data:", cdoc.data());
                        this.view =
                            ` 
                        <main id="chapterPage">
                            <div class="chapter-header">
                                <a href="#/ranobe/${this.ranobe.id}" class="ranobe-name">${this.ranobe.data().name}</a>
                                <div class="chapter-name"></div>
                            </div>
                            <div>
                                <div class="chapter-versions">                  
                                </div>
                                <hr>
                            </div>
                            <div class = "chapter-actions">
                            </div>
                        </main>
                        `
                        this.chapter = cdoc;
                        this.translates = await chapterRef.collection("translates").get();

                    }
                    else {
                        this.view = Error.render();
                    }
                }
                )
                    .catch(function (error) {
                        console.log("Error getting document:", error);
                    });
            }
            else {
                this.view = Error.render();
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        return this.view;
    }

    async after_render() {
        if (this.chapter != null) {
            let chapterName = document.getElementsByClassName("chapter-name")[0];
            let chapterVersions = document.getElementsByClassName("chapter-versions")[0];
            let chapterPage = document.getElementById('chapterPage');
            chapterName.innerHTML = this.chapter.data().name;

            firebase.auth().onAuthStateChanged(async function (user) {
                if (user) {

                    let curUser = await firebase.firestore().collection("users").doc(user.email).get();
                    if (curUser.data().status == 'translater') {
                        let add_btn = document.createElement('button');
                        add_btn.className = 'chapter-add';
                        add_btn.setAttribute('id', 'add_btn');
                        add_btn.innerHTML = `<i style = "font-size: 25px;" class="fa fa-plus" aria-hidden="true"></i>`;
                        chapterVersions.appendChild(add_btn);
                    }
                }
                else {
                }
            });

            let text = document.createElement('div');
            text.style.display = 'block';
            text.className = 'chapter-text';
            text.setAttribute('id', 0 + '-text');
            text.innerHTML = this.translates.docs[0].data().text;
            chapterPage.appendChild(text);

            this.translates.forEach(element => {

                let span = document.createElement('span');
                span.className = 'chapter-version';
                span.setAttribute('id', element.id);
                span.addEventListener("click", () => {
                    chapterPage.removeChild(document.getElementsByClassName('chapter-text')[0]);
                    let text = document.createElement('div');
                    text.style.display = 'block';
                    text.className = 'chapter-text';
                    text.setAttribute('id', element.id + '-text');
                    text.innerHTML = element.data().text;
                    chapterPage.appendChild(text);
                });
                span.innerHTML = element.data().name;
                chapterVersions.appendChild(span);
            });
        }
    }
}

export default new Chapter();