// Create a data base open request, named "dataBase", version 1
let request = indexedDB.open("dataBase", 1);
let dataBase;

// Data base did NOT already exist, but now created
request.onupgradeneeded = function() {
    // Store data base reference
    dataBase = request.result;
    // Check data base to see if objectStore exists. if not, create one
    if (!dataBase.objectStoreNames.contains('tokenObjectStore')) {
        dataBase.createObjectStore('tokenObjectStore',{autoIncrement:true});
    } 
};

request.onsuccess = function() {
    // Store data base reference
    dataBase = request.result;
    // Make a transaction object that has "read" access to the tokenObjectStore
    let transaction = dataBase.transaction("tokenObjectStore", "readonly");
    // Make a reference to the tokenObjectStore
    let tokenObjectStore = transaction.objectStore("tokenObjectStore");
    // Make a get request to the objectStore, to get the value for key 1
    let getRequest = tokenObjectStore.get(1);
    getRequest.onsuccess = function(){
        if (getRequest.result){ // If a result was found from objectStore, store value in localStorage with key "token"
            localStorage.setItem("token", getRequest.result);
            console.log("Successfully retrived token from indexedDB and saved to localStorage");
        }
    }
    getRequest.onerror = function(){
        console.log("ERROR: Could not retrive token")
    } 
}
request.onerror = function(){
    console.log("ERROR: could not open data base")
}

// Function to save passed in token to indexedDB and localStorage     
function saveToken(token){
    if (token !== ""){
        // Make a transaction object that has "read and write" access to the tokenObjectStore
        let transaction = dataBase.transaction("tokenObjectStore", "readwrite");
        // Make a reference to the tokenObjectStore
        let tokenObjectStore = transaction.objectStore("tokenObjectStore");
        // Store the token in objectStore for long term storage, with key 1
        tokenObjectStore.put(token, 1)
        // Store the token in localStorage for fast sync access, with key "token"
        localStorage.setItem("token", token);
        console.log("Successfully saved token to indexedDB and localStorage");
    }
}

// Function to check if token in localStorage if expired or not
function tokenIsValid(){
    let token = localStorage.getItem("token") // Get token from localStorage if one exists, if not return null
    if (token !== null) {
        // Parse the token to extract the exipry date
        const _tokenExpireDate = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp;
        // Get current time
        const _currentTime = Math.floor(Date.now() / 1000);
        if (_tokenExpireDate > _currentTime) { return true } else { return false };
    } else {
        return false
    }
}

// Function to remove token from indexedDB and localStorage (called when user logs out)
function removeToken(){
    // Make a transaction object that has "read and write" access to the tokenObjectStore
    let transaction = dataBase.transaction("tokenObjectStore", "readwrite");
    // Make a reference to the tokenObjectStore
    let tokenObjectStore = transaction.objectStore("tokenObjectStore");
    // Delete the token in objectStore, with key 1
    tokenObjectStore.delete(1)
    // Remove the token in localStorage, with key "token"
    localStorage.removeItem("token")
    console.log("Successfully removed token from indexedDB localStorage");
}

module.exports = {
    saveToken,
    tokenIsValid,
    removeToken
}