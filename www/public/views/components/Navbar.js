class Navbar {

    constructor() {
        this.user = null;
    }

    async render() {
        let view =
        `    
            <a class="active" href="/#/">RanobeHub</a>
            <button id ="profile_btn"><i class="fa fa-user"></i> Profile</button>

            <div id="profile_container" class="modal">
            <div class="modal-content">
                <div class="user-container">
                    <img src="img/screen.jpg" height="300px" width="300px">
                    <div class="user-info">
                        <div class = "close">
                            <button id = "profile_close" title="Close Modal">&times;</button>
                        </div>
                        <div class = "text"> 
                            <h1 id = "u_status"></h1>
                            <h1 id = "u_email"></h1>
                        </div>
                        <button id="logout_btn" class="danger"> Logout </button>
                    </div>
                </div>
            </div>
        </div>
        `
        return view
    }
    async after_render() {
        document.getElementById("profile_btn").addEventListener("click", () => {
            let status = document.getElementById("u_status");
            let email = document.getElementById("u_email");
            var profile = document.getElementById("profile_btn");
            firebase.auth().onAuthStateChanged(async function (user) {
                if (user) {
                    let curUser = await firebase.firestore().collection("users").doc(user.email).get();
                    profile.style.display = 'block';
                    email.innerHTML = "Email: " + curUser.id;
                    status.innerHTML = "Status: " + curUser.data().status;
                }
                else {
                    email.innerHTML = "Email: ";
                    status.innerHTML = "Status: ";
                    profile.style.display = 'none';
                }
            });
            document.getElementById("profile_container").style.display = 'block';
        });
        document.getElementById("profile_close").addEventListener("click", () => {
            document.getElementById("profile_container").style.display = 'none';
        });
        document.getElementById("logout_btn").addEventListener("click", () => {
            document.getElementById("profile_container").style.display = 'none';
            firebase.auth().signOut().then(function () {
            }).catch(function (error) {
            });
        });



        window.onscroll = function () { myFunction() };

        var navbar = document.getElementById("navbar");
        var sticky = navbar.offsetTop;

        function myFunction() {
            if (window.pageYOffset >= sticky + 10) {
                navbar.classList.add("sticky")
            } else {
                navbar.classList.remove("sticky");
            }
        }
    }

}

export default new Navbar();