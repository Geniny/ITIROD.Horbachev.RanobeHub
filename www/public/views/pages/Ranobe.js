/*
let getRanobe = async() => {

}
*/

import Utils from './../../services/Utils.js'

let getRanobe = async (str) =>
{
    return firebase.firestore().collection("ranobes").doc(str).get().then((doc) => doc);
}

let Ranobe = {
    render : async () => {   
        let request = Utils.parseRequestURL()
        let ranobeInfo = await getRanobe(request.id);
        let view = 
        `
        <main id="ranobePage">
            <div class="ranobe-content">
                <div class="ranobe-img">
                    <img id = "${ranobeInfo.id}">
                </div>
                <div class="ranobe-info">
                    <h1>${ranobeInfo.data().name}</h1>
                    <hr />
                    <h2>Status: ${ranobeInfo.data().status}</h2>
                    <h2>Genre: ${ranobeInfo.data().genre.forEach(element => `${element} hi`)}</h2>
                    <h2>Chapters: </h2>
                    <h2>Author: ${ranobeInfo.data().author}</h2>
                    <h2>Year: ${ranobeInfo.data().year}</h2>
                    <div class="rating">
                        <label id = "1-rt">☆</label>
                        <label id = '2-rt'>☆</label>
                        <label id = '3-rt'>☆</label>
                        <label id = '4-rt'>☆</label>
                        <label id = '5-rt'>☆</label>
                    </div>
                    <a id="readnow" href="#/ranobe/${ranobeInfo.id}/chapter/1">Read now</a>
                </div>
            </div>
        </main>
        `
        return view;
    }
    , after_render: async () => {
        let request = Utils.parseRequestURL()
        let rt_1 = document.getElementById("1-rt");
        let rt_2 = document.getElementById("2-rt");
        let rt_3 = document.getElementById("3-rt");
        let rt_4 = document.getElementById("4-rt");
        let rt_5 = document.getElementById("5-rt");

        let ranobeInfo = await getRanobe(request.id);
        let ranobe_img = document.getElementById(ranobeInfo.id);
        firebase.storage().ref().child('ranobes/'+ ranobeInfo.id + '.jpg').getDownloadURL().then( (url) => ranobe_img.src = url);
        let rating = ranobeInfo.data().rating;
        if (rating <= 5 && rating >= 4.5)
        {
            rt_1.className = 'checked';
            rt_2.className = 'checked';
            rt_3.className = 'checked';
            rt_4.className = 'checked';
            rt_5.className = 'checked';
        }
        else if (rating < 4.5 && rating >= 3.5)
        {
            rt_1.className = 'checked';
            rt_2.className = 'checked';
            rt_3.className = 'checked';
            rt_4.className = 'checked';
        }
        else if (rating < 3.5 && rating >= 2.5)
        {
            rt_1.className = 'checked';
            rt_2.className = 'checked';
            rt_3.className = 'checked';
        }
        else if (rating < 2.5 && rating >= 1.5)
        {
            rt_1.className = 'checked';
            rt_2.className = 'checked';
        }
        else
        {
            rt_1.className = 'checked';
        }
        
    }
 
 }
 
 export default Ranobe;