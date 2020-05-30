let Navbar = {
    render: async () => {
        let view =  
        `    
        <a class="active" href="index.html">RanobeHub</a>
        <button id ="profile_btn"><i class="fa fa-user"></i> Profile</button>

        <div id="profile_container" class="modal">
        <div class="modal-content">
            <div class="user-container">
                <img src="img/screen.jpg" height="300px" width="300px">
                <div class="user-info">
                    <span id="profile_close" class="close"
                        title="Close Modal">&times;</span>
                    <h1>Status: user</h1>
                    <h1>Email: user@mail.ru</h1>
                </div>
            </div>
        </div>
    </div>
        `
        return view
    },
    after_render: async () => 
    {     
        var user = firebase.auth().currentUser;
        var profile = document.getElementById("profile_btn");
        if (user) {
            profile.style.display = 'block';
        } else {
            profile.style.display = 'none';
        }

        document.getElementById("profile_btn").addEventListener ("click",  () => {
            document.getElementById("profile_container").style.display = 'block';   
        })
        document.getElementById("profile_close").addEventListener ("click",  () => {
            document.getElementById("profile_container").style.display = 'none';   
        })

        window.onscroll = function () { myFunction() };

        var navbar = document.getElementById("navbar");
        var sticky = navbar.offsetTop;

        function myFunction() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky")
            } else {
                navbar.classList.remove("sticky");
            }
        }
    }

}

export default Navbar;