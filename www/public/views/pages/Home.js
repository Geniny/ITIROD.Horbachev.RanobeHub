// --------------------------------
//  Define Data Sources
// --------------------------------


let getRanobes = async () => {
    return firebase.firestore().collection("ranobes").get();
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
                        <a href="#">Name</a>
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
    , after_render: async () => {
        let ranobes = await getRanobes();
        let ranobe_content = document.getElementsByClassName("ranobe-content")[0];
        ranobes.forEach(element => {
            let rnb = document.createElement('div');
            rnb.className = 'ranobe-column';
            rnb.innerHTML = 
                `
                <a href="#/ranobe/${element.id}">
                    <div class="status-label">${element.data().status}</div>
                    <span class="year-block">${element.data().year}</span>
                    <img class="ranobe-img" src="img/oregairu8.jpg" alt="${element.data().name}">
                </a>
                <a class="ranobe-title" href="#ranobe/${element.id}">${element.data().name}</a>
                `;
            ranobe_content.appendChild(rnb);
            
        });

    }

}

export default Home;