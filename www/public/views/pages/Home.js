// --------------------------------
//  Define Data Sources
// --------------------------------


let getRanobes = async () => {
    return firebase.firestore().collection("ranobes").get();
}

let render_ranobes = async(ranobes) => {
    let ranobe_content = document.getElementsByClassName("ranobe-content")[0];
    ranobes.forEach(element => 
    {
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
        firebase.storage().ref().child('ranobes/'+ element.id + '.jpg').getDownloadURL().then( (url) => img.src = url);

        ref.appendChild(img);
        rnb.appendChild(ref);
        rnb.appendChild(ref2);

        ranobe_content.appendChild(rnb);   
              
    });
}

let Home = {
    render: async () => {
        let view =
        `    
        <main id="mainPage">
            <div class="filter-content">
                <div class="dropdown">
                    <button class="dropbtn">Filters
                    </button>
                    <div class="dropdown-content">
                        <span id ="name_filter">Name</span>
                        <a href="#">Genre</a>
                        <a href="#">Rating</a>
                    </div>
                </div>
                <form class="search" action="action_page.php">
                    <input type="text" placeholder="Search.." name="search">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>

            <div class="ranobe-content">
            </div>
        </main>
        `
        return view
    }
    , 
    after_render: async () => {
        let ranobes = await getRanobes();
        document.getElementById("name_filter").addEventListener("click", async () => {
            await render_ranobes(ranobes.sort());
        })
        await render_ranobes(ranobes);
        

    }

}

export default Home;