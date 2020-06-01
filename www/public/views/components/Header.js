let Header = {
    render: async () => {
        let view =
        `
        <div class="auth_container">
            <button id="signin_btn">Sign
                    In</button>
            <button id="signup_btn">Sign
                    Up</button>
        </div>

        <div id="signin_form" class="modal">
            <div class="modal-content">
                <div class="container">
                    <div class = "close">
                        <button id = "signin_close" title="Close Modal">&times;</button>
                    </div>
                    <h1>Sign In</h1>
                    <hr>
                    <label for="uname"><b>Username</b></label>
                    <input id = "email_field" class="login_input" type="text" placeholder="Enter Username" name="uname" required>
                    <label for="psw"><b>Password</b></label>
                    <input id = "password_field" class="login_input" type="password" placeholder="Enter Password" name="psw" required>
                    <button id = "signin_submit_btn" type="submit" class="success">Sign In</button>
                </div>
            </div>
        </div>

        <div id="signup_form" class="modal">
            <div class="modal-content">
                <div class="container">
                    <div class = "close">
                        <button id = "signup_close" title="Close Modal">&times;</button>
                    </div>
                    <h1>Sign Up</h1>
                    <hr>
                    <label for="email_field_r"><b>Email</b></label>
                    <input id = "email_field_r" class="login_input" type="text" placeholder="Enter Email" required>

                    <label for="password_field_r"><b>Password</b></label>
                    <input id = "password_field_r" class="login_input" type="password" placeholder="Enter Password" required>

                    <label for="repeat_password_field_r"><b>Repeat Password</b></label>
                    <input id = "repeat_password_field_r" class="login_input" type="password" placeholder="Repeat Password" required>
                    <button id = "signup_submit_btn" type="submit" class="success">Sign Up</button>
                </div>
            </div>
        </div>
        `
        return view
    },
    after_render: async () => {
        document.getElementById("signin_btn").addEventListener("click", () => {
            document.getElementById("signin_form").style.display = 'block';
        })
        document.getElementById("signup_btn").addEventListener("click", () => {
            document.getElementById("signup_form").style.display = 'block';
        })
        document.getElementById("signin_close").addEventListener("click", () => {
            document.getElementById("signin_form").style.display = 'none';
        })
        document.getElementById("signup_close").addEventListener("click", () => {
            document.getElementById("signup_form").style.display = 'none';
        })
        document.getElementById("signin_submit_btn").addEventListener("click", () => {
            let email = document.getElementById("email_field");
            let password = document.getElementById("password_field");
            firebase.auth().signInWithEmailAndPassword(email.value, password.value).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                    password.value = '';
                } else {
                    alert(errorMessage);
                }
            });
        });

        document.getElementById("signup_submit_btn").addEventListener("click", () => {
            let email = document.getElementById("email_field_r");
            let password = document.getElementById("password_field_r");
            let repeat_password = document.getElementById("repeat_password_field_r");

            if (password.value !== repeat_password.value)
            {           
                repeat_password.value = '';
                return;
            }

            firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error) {

                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) 
                {
                    firebase.firestore().collection("users").doc(user.email).set({email: user.email, password: password.value, avatar: "deffault", status: "user"});
                } 
                else 
                {
                }
            });
            


        });

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) 
            {
                document.getElementById("signin_btn").style.display = 'none';
                document.getElementById("signup_btn").style.display = 'none';
                document.getElementById("signin_form").style.display = 'none';
                document.getElementById("signup_form").style.display = 'none';
                document.getElementById("profile_btn").style.display = 'block';
            } 
            else 
            {
                document.getElementById("profile_btn").style.display = 'none';           
                document.getElementById("signin_btn").style.display = 'block';
                document.getElementById("signup_btn").style.display = 'block';
            }
        });

    }

}

export default Header;