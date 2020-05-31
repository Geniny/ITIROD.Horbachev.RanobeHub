let Navbar = {
    render: async () => {
        let view =  
        `
        <hr>
        <a href="https://github.com/Geniny">
            <img id = "footer_img">
        </a>
        <p>Created by Dmitriy Horbachev</p> 
        `
        return view
    },
    after_render: async () => 
    {     
        let footer_img = document.getElementById('footer_img');
        firebase.storage().ref().child('git.png').getDownloadURL().then( (url) => footer_img.src = url);
    }

}

export default Navbar;