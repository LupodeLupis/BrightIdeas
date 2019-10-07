module.exports = function() {
    // Base URL to The back end API
    let baseUrl = "https://bright-ideas-api.herokuapp.com/"

    return {
        // Make a GET request to back end API to get all profiles
        getAllFollowers(){
            return fetch(baseUrl + "followers/", {
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
        getFollowerByID(followerId){
            return fetch(baseUrl + "follower/" + followerId, {
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
        getFollowerByIdea(ideaID) {
            return fetch(baseUrl + "follower-by-idea/" + ideaID, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                return Promise.resolve(data)
            })
            .catch(error => {
                console.log("Error" + error)
            })
        }
    }
} 