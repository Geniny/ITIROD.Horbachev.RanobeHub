import Utils from './../../services/Utils.js'
import Error from './../../views/pages/Error.js'

class Ranobe {

    constructor() {
        this.ranobe = null;
        this.request = null;
        this.view = null;
    }

    async render() {
        this.request = Utils.parseRequestURL()
        await firebase.firestore().collection("ranobes").doc(this.request.id).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                this.view =
                    `
                <main id="ranobePage">
                    <div class="ranobe-content">
                        <div class="ranobe-img">
                        </div>
                        <div class = "ranobe-content-info">
                            <div class = "ranobe-header">
                                <h1 id = 'rnb_name'></h1>
                                <hr />
                            </div>
                            <div class="ranobe-info">
                                <h2 id = "rnb_status"></h2>
                                <h2 id = 'rnb_genre'></h2>
                                <h2 id = "rnb_author"></h2>
                                <h2 id = "rnb_year"></h2>
                                <div class="rating">
                                    <label id = "1-rt">☆</label>
                                    <label id = '2-rt'>☆</label>
                                    <label id = '3-rt'>☆</label>
                                    <label id = '4-rt'>☆</label>
                                    <label id = '5-rt'>☆</label>
                                </div>
                            </div>
                            <div class = "ranobe-action">
                                <a id="readnow">Read now</a>
                            </div>
                        </div>
                    </div>
                </main>
                `
                this.ranobe = doc;
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
        if (this.ranobe != null) {
            let rt_1 = document.getElementById("1-rt");
            let rt_2 = document.getElementById("2-rt");
            let rt_3 = document.getElementById("3-rt");
            let rt_4 = document.getElementById("4-rt");
            let rt_5 = document.getElementById("5-rt");
            let genre = document.getElementById("rnb_genre");
            let name = document.getElementById("rnb_name");
            let status = document.getElementById("rnb_status");
            let author = document.getElementById("rnb_author");
            let year = document.getElementById("rnb_year");
            let read = document.getElementById("readnow");
            let ranobe_img = document.getElementsByClassName("ranobe-img")[0];
            let img = document.createElement('img')
            img.setAttribute('id', this.ranobe.id);
            ranobe_img.appendChild(img);

            name.innerHTML = this.ranobe.data().name;
            status.innerHTML = "Status: " + this.ranobe.data().status;
            author.innerHTML = "Author: " + this.ranobe.data().author;
            year.innerHTML = "Year: " + this.ranobe.data().year;
            let genres = ""
            for (var key in this.ranobe.data().genre) {
                genres += this.ranobe.data().genre[key] + " ";
            }
            genre.innerHTML = "Genres: " + genres;
            read.href = `#/ranobe/${this.ranobe.id}/chapter/1`;
            firebase.storage().ref().child('ranobes/' + this.ranobe.id + '.jpg').getDownloadURL().then((url) => img.src = url);
            let rating = this.ranobe.data().rating;
            if (rating <= 5 && rating >= 4.5) {
                rt_1.className = 'checked';
                rt_2.className = 'checked';
                rt_3.className = 'checked';
                rt_4.className = 'checked';
                rt_5.className = 'checked';
            }
            else if (rating < 4.5 && rating >= 3.5) {
                rt_1.className = 'checked';
                rt_2.className = 'checked';
                rt_3.className = 'checked';
                rt_4.className = 'checked';
            }
            else if (rating < 3.5 && rating >= 2.5) {
                rt_1.className = 'checked';
                rt_2.className = 'checked';
                rt_3.className = 'checked';
            }
            else if (rating < 2.5 && rating >= 1.5) {
                rt_1.className = 'checked';
                rt_2.className = 'checked';
            }
            else {
                rt_1.className = 'checked';
            }
        }

    }

}

export default new Ranobe();