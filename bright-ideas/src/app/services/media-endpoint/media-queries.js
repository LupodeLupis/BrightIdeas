module.exports = function() {
    // Base URL to The back end API
    let baseUrl = "https://bright-ideas-api.herokuapp.com/"

    return {
        // Make a GET request to back end API to get all profiles
        getAllMedias(){
            return fetch(baseUrl + "media/", {
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
                console.log("Error: " + error)
            })
        },
        getMediaByID(mediaId){
            return fetch(baseUrl + "media/" + mediaId, {
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
                console.log("Error: " + error)
            })
        },
    }
} 