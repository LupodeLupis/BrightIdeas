module.exports = function() {
    // Base URL to The back end API
    let baseUrl = "https://bright-ideas-api.herokuapp.com/"

    return {
        // Make a GET request to back end API to get all profiles
        getAllPosting(){
            return fetch(baseUrl + "postings/", {
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
        getPostingById(postingId){
            return fetch(baseUrl + "posting/" + postingId, {
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
        getPostingByNameWildcard(postingName){
            return fetch(baseUrl + "postings/postingName%" + postingName, {
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
        getPostingByDescriptionWildcard(postingDesc){
            return fetch(baseUrl + "postings/postingDescription%" + postingDesc, {
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
        getPostingWithOpenPositions(){
            return fetch(baseUrl + "postings/open", {
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
        }
    }
} 