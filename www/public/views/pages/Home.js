// --------------------------------
//  Define Data Sources
// --------------------------------


let render_ranobes = async (ranobes) => {
    let ranobe_content = document.getElementsByClassName("ranobe-content")[0];
    ranobe_content.innerHTML = "";
    ranobes = await ranobes.get();
    ranobes.forEach(element => {
        let rnb = document.createElement('div');
        rnb.className = 'ranobe-column';

        let ref = document.createElement('a');
        ref.href = '#/ranobe/' + element.id;
        ref.innerHTML =
            `      
        <div class="status-label">${element.data().status}</div>
        <span class="year-block">${element.data().year}</span>
        `

        let ref2 = document.createElement('a');
        ref2.className = 'ranobe-title';
        ref2.href = '#/ranobe/' + element.id;
        ref2.innerHTML = `${element.data().name}`

        let img = document.createElement('img');
        img.alt = element.data().name;
        firebase.storage().ref().child('ranobes/' + element.id + '.jpg').getDownloadURL().then((url) => img.src = url);

        ref.appendChild(img);
        rnb.appendChild(ref);
        rnb.appendChild(ref2);

        ranobe_content.appendChild(rnb);

    });
}

class Home {

    constructor() {
        this.ranobes = null;
    }

    async render() {
        this.ranobes = firebase.firestore().collection("ranobes");
        let view =
            `    
        <main id="mainPage">
            <div class="filter-content">
                <div class="dropdown">
                    <button class="dropbtn">Filters
                    </button>
                    <div class="dropdown-content">
                        <span id ="name_filter">Name</span>
                        <span id = "rating_filter">Rating</spam>
                    </div>
                </div>
                <div class="search">
                    <input id = "search_field" type="text" placeholder="Search.." name="search">
                    <button id = "search_btn" type="submit"><i class="fa fa-search"></i></button>
                </div>
            </div>

            <div class="ranobe-content">
            </div>
        </main>
        `
        return view
    }

    async after_render() {
        document.getElementById("name_filter").addEventListener("click", async () => {
            await render_ranobes(this.ranobes.orderBy("name"));
        })
        document.getElementById("rating_filter").addEventListener("click", async () => {
            await render_ranobes(this.ranobes.orderBy("rating", "desc"));
        })
        document.getElementById("search_btn").addEventListener("click", async () => {
            let search = document.getElementById("search_field");
            if (search.value != '') {
                await render_ranobes(this.ranobes.where("lower_name", "array-contains-any", search.value.toLowerCase().split(" ")));
            }
        })
        document.getElementById("mainPage").addEventListener("keydown", async (event) => {
            if (event.keyCode == 13) {
                let search = document.getElementById("search_field");
                if (search.value != '') {
                    await render_ranobes(this.ranobes.where("lower_name", "array-contains-any", search.value.toLowerCase().split(" ")));
                }
                else
                {
                    
        await render_ranobes(this.ranobes);
                }
            }
        })
        await render_ranobes(this.ranobes);


    }

}

export default new Home();