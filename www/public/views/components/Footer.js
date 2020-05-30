let Navbar = {
    render: async () => {
        let view =  
        `
        <hr>
        <a href="https://github.com/Geniny">
            <img src="img/git.png">
        </a>
        <p>Created by Dmitriy Horbachev</p> 
        `
        return view
    },
    after_render: async () => 
    {     
    }

}

export default Navbar;