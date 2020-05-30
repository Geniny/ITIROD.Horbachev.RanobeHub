// --------------------------------
//  Define Data Sources
// --------------------------------

let getPostsList = async () => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`https://5bb634f6695f8d001496c082.mockapi.io/api/posts`, options)
       const json = await response.json();
       // console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let Home = {
   render : async () => {
       let posts = await getPostsList()
       let view =  /*html*/`
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
          <h1>Hi there </h1>
       `
       return view
   }
   , after_render: async () => {
   }

}

export default Home;