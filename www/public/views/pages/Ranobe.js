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
                    <img src="img/oregairu8.jpg">
                </div>
                <div class="ranobe-info">
                    <h1>Ranobe name</h1>
                    <hr />
                    <h2>Status: ${ranobeInfo.data().status}</h2>
                    <h2>Genre: ${ranobeInfo.data().genre.forEach(element => `${element} hi`)}</h2>
                    <h2>Pages: </h2>
                    <h2>Author: </h2>
                    <h2>Year: </h2>
                    <div class="rating">
                        <label>☆</label>
                        <label>☆</label>
                        <label>☆</label>
                        <label>☆</label>
                        <label>☆</label>
                    </div>
                    <a id="readnow" href="chapter.html">Read now</a>
                </div>
            </div>
        </main>
        `
        return view;
    }
    , after_render: async () => {

    }
 
 }
 
 export default Ranobe;