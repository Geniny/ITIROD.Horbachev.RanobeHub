const Utils = {
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null,
            id2         : null,
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]
        request.id2         = r[4]

        return request
    }
    
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Utils;