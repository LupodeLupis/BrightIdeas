module.exports = function(){
    // Base URL to The back end API
    let baseUrl = "https://bright-ideas-api.herokuapp.com/"

    return {
        // Make a GET request to back end API to get all ideas
        getAllIdeas(){
            return fetch(baseUrl + "ideas/", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                return Promise.resolve(data)
            })
            .catch(error => {
                console.log("ERROR: " + error)
            })
        },
        getIdeaById(ideaId){
            return fetch(baseUrl + "idea/" + ideaId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                return Promise.resolve(data)
            })
            .catch(error => {
                console.log("ERROR: " + error)
            })
        }
    }
}