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
                    
                <label for="file_field">
                    <a id = "get_img_btn" style="cursor: pointer;">
                        <img id = 'profile_img' height = "300px" width = "300px">
                    </a>
                </label> 
                <input type="file" id="file_field" style="display: none;">
                    <div class="user-info">
                        <div class = "close">
                            <button id = "profile_close" title="Close Modal">&times;</button>
                        </div>
                        <div class = "text"> 
                            <h1 id = "u_status"></h1>
                            <h1 id = "u_email"></h1>
                        </div>
                        <div class='profile-actions'>
                            <button id = "upload_btn" > Upload </button>
                            <button id = "logout_btn" class="danger"> Logout </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        return view
    }
    async after_render() {
        
        let file_field = document.getElementById("file_field");
        let upload_btn = document.getElementById("upload_btn");
        let get_img_btn = document.getElementById("get_img_btn");

        get_img_btn.addEventListener("click", () => { 
            upload_btn.style.display = 'block';
        });

        upload_btn.addEventListener("click", () => {
            let file = file_field.files[0];
            if (file != null)
            {
                firebase.auth().onAuthStateChanged(async function (user) {
                    if (user) 
                    {
                        firebase.storage()
                            .ref('users/' + user.uid + '/profile.jpg')
                            .put(file)
                            .then( () => {console.log("uploaded"); upload_btn.style.display = 'none';});
                    }
                });
            }
            else
            {
                alert("No files!");
            }
        });


        document.getElementById("profile_btn").addEventListener("click", () => {
            let status = document.getElementById("u_status");
            let email = document.getElementById("u_email");
            var profile = document.getElementById("profile_btn");
            let profileImg = document.getElementById("profile_img");
            firebase.auth().onAuthStateChanged(async function (user) {
                if (user) 
                {
                    let curUser = await firebase.firestore().collection("users").doc(user.email).get();
                    profile.style.display = 'block';
                    email.innerHTML = "Email: " + curUser.id;
                    status.innerHTML = "Status: " + curUser.data().status;
                    firebase.storage()
                        .ref('users/' + user.uid + '/profile.jpg')
                        .getDownloadURL()
                        .then( url => profileImg.src = url)
                        .catch( () =>
                            firebase.storage()
                                .ref('users/screen.jpg')
                                .getDownloadURL()
                                .then( url => profileImg.src = url)
                        );

                }
                else 
                {
                    email.innerHTML = "Email: ";
                    status.innerHTML = "Status: ";
                    profile.style.display = 'none';
                }
            });
            document.getElementById("profile_container").style.display = 'block';
        });


        document.getElementById("profile_close").addEventListener("click", () => {
            document.getElementById("profile_container").style.display = 'none'; 
            upload_btn.style.display = 'none';
        });
        document.getElementById("logout_btn").addEventListener("click", () => {
            document.getElementById("profile_container").style.display = 'none'; 
            upload_btn.style.display = 'none';
            firebase.auth().signOut().then(function () {
            }).catch(function (error) {
            });
        });

        window.onscroll = function () { myFunction() };

        let navbar = document.getElementById("navbar");
        let sticky = navbar.offsetTop;

        function myFunction() {
            if (window.pageYOffset >= sticky + 30) {
                navbar.classList.add("sticky")
            } else {
                navbar.classList.remove("sticky");
            }
        }
    }

}

export default new Navbar();