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
        this.next = null;
        this.previous = null;
        this.translatesCount = -1;
    }

    async render() {    
        this.next = null;
        this.previous = null;
        this.translatesCount = -1;
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
                            <header class="chapter-header">
                                <h1  class="ranobe-name"><a href="#/ranobe/${this.ranobe.id}">${this.ranobe.data().name}</a></h1>
                                <h2 class="chapter-name"></div>
                            </header>
                            <div>
                                <div class="chapter-versions">                  
                                </div>
                                <hr>
                            </div>
                            <div class = "chapter-text-container"></div>
                            <div class = "chapter-actions">
                                <a id="previous" >&laquo;</a>
                                <a id="next" >&raquo;</a>
                            </div>
                            <div id="add_form" class="modal">
                                <div class="modal-content">
                                    <div class="container">
                                        <span id = "add_chp_close" class="close" title="Close Modal">&times;</span>
                                        <h1>Add chapter</h1>
                                        <hr>
                                        <label for = "chp_version_name"><b>Version name</b></label>
                                        <input id = "chp_version_name" class="login_input" type="text" placeholder="Enter version name"required>                                       
                                        <label for = "chp_textarea" ><b>Chapter text</b></label>
                                        <textarea id = "chp_textarea" class = "text-input" name="chp_text"  placeholder="Enter text" required></textarea>
                                        <button id = "add_submit_btn" type="submit" class="success">Add</button>
                                    </div>
                                </div>
                            </div>
                        </main>
                        `
                        this.chapter = cdoc;
                        this.translates = await chapterRef.collection("translates").get();
                        let nextChp = parseInt(cdoc.id) + 1;
                        let prevChp = parseInt(cdoc.id) - 1;
                        await ranobeRef.collection('chapters').doc(nextChp.toString()).get().then( (doc) => { if (doc.exists) {this.next = doc.id;
                            console.log("Document data:", doc.data()); }});                       
                        await ranobeRef.collection('chapters').doc(prevChp.toString()).get().then( (doc) => { if (doc.exists) {this.previous = doc.id}});
                    }
                    else {
                        this.view = Error.render();
                    }
                }).catch(function (error) {
                        console.log("Error getting document:", error);
                });
            }
            else 
            {
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
            let chapterPage = document.getElementsByClassName('chapter-text-container')[0];
            let next = document.getElementById('next');
            let previous = document.getElementById('previous');
            chapterName.innerHTML = this.chapter.data().name;

            if (this.next != null)
            {
                next.style.display = 'block';
                next.setAttribute('href','#/ranobe/' + this.ranobe.id + '/chapter/' + this.next);
            }
            if (this.previous != null)
            {           
                previous.style.display = 'block';
                previous.setAttribute('href','#/ranobe/' + this.ranobe.id + '/chapter/' + this.previous);
            }

            let ref = firebase.firestore().collection("ranobes")
            .doc(this.ranobe.id).collection("chapters")
            .doc(this.chapter.id).collection('translates')
            .doc(this.translatesCount.toString());
            firebase.auth().onAuthStateChanged(async function (user) {
                if (user) {
                    let curUser = await firebase.firestore().collection("users").doc(user.email).get();
                    if (curUser.data().status == 'translater') {
                        let add_btn = document.createElement('button');
                        let close = document.getElementById("add_chp_close");
                        let add_chp = document.getElementById("add_submit_btn");
                        close.addEventListener("click", () => {
                            document.getElementById("add_form").style.display = 'none';
                        });

                        add_chp.addEventListener("click", async () => {
                            let versionName = document.getElementById('chp_version_name');
                            let text = document.getElementById('chp_textarea');                        
                            await ref.set({name: versionName.value, text: text.value });
                            document.getElementById("add_form").style.display = 'none';

                        });

                        add_btn.className = 'chapter-add';
                        add_btn.setAttribute('id', 'add_btn');
                        add_btn.innerHTML = `<i style = "font-size: 25px;" class="fa fa-plus" aria-hidden="true"></i>`;
                        add_btn.addEventListener("click", () => {
                            document.getElementById("add_form").style.display = 'block';
                        })
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
                    var active = document.getElementsByClassName('chapter-version active');
                    for (let item of active) {
                        item.classList.remove('active');
                    }
                    chapterPage.removeChild(document.getElementsByClassName('chapter-text')[0]);
                    let text = document.createElement('div');
                    text.style.display = 'block';
                    text.className = 'chapter-text';
                    text.setAttribute('id', element.id + '-text');
                    text.innerHTML = element.data().text;
                    chapterPage.appendChild(text);
                    span.className = 'chapter-version active';
                });
                span.innerHTML = element.data().name;
                chapterVersions.appendChild(span);
                this.translatesCount ++;
            });

            let defSpan = document.getElementById(this.translates.docs[0].id);
            defSpan.className = 'chapter-version active';
        }
    }
}

export default new Chapter();