
class Error {

    constructor() {
    }

    async render() {
        let view =
        `    
        <main id="errorPage">
            <div class = "center">
                <h1> 404 </h1>
            </div>
        </main>
        `
        return view
    }

    async after_render() {


    }

}

export default new Error();