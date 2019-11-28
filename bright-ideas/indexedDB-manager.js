// Create a data base open request, named "dataBase", version 1
let request = indexedDB.open("dataBase", 1);
let dataBase;
var Buffer = require('buffer/').Buffer 

// Data base did NOT already exist, but now created
request.onupgradeneeded = function() {
    // Store data base reference
    dataBase = request.result;
    // Check data base to see if objectStore exists. if not, create one
    if (!dataBase.objectStoreNames.contains('tokenObjectStore')) {
        dataBase.createObjectStore('tokenObjectStore',{ autoIncrement: true });
    }
    if(!dataBase.objectStoreNames.contains('userObjectStore')){
        dataBase.createObjectStore('userObjectStore', { autoIncrement: true })
    }
};

request.onsuccess = function() {
    // Store data base reference
    dataBase = request.result;
    // Make a transaction object that has "read" access to the tokenObjectStore
    let tokenTransaction = dataBase.transaction("tokenObjectStore", "readonly");
    // Make a reference to the tokenObjectStore
    let tokenObjectStore = tokenTransaction.objectStore("tokenObjectStore");
    // Make a get request to the objectStore, to get the value for key 1
    let tokenGetRequest = tokenObjectStore.get(1);
    tokenGetRequest.onsuccess = function(){
        if (tokenGetRequest.result){ // If a result was found from objectStore, store value in localStorage with key "token"
            localStorage.setItem("token", tokenGetRequest.result);
            console.log("Successfully retrived token from indexedDB and saved to localStorage");
        }
    }
    tokenGetRequest.onerror = function(){
        console.log("ERROR: Could not retrive token")
    }

    let userTransaction = dataBase.transaction('userObjectStore', 'readonly');
    let userObjectStore = userTransaction.objectStore('userObjectStore');
    let userGetRequest = userObjectStore.get(1);
    userGetRequest.onsuccess = function(){
        if(userGetRequest.result){
            localStorage.setItem('user', JSON.stringify(userGetRequest.result));
            console.log("Successfully retrived user from indexedDB and saved to localStorage");
        }
    }
    userGetRequest.onerror = function(){
        console.log("ERROR: Could not retrive user")
    }
}
request.onerror = function(){
    console.log("ERROR: could not open data base")
}

// Function to save passed in user to indexedDB and localStorage     
function saveUser(user){
    if (user){
        // Make a transaction object that has "read and write" access to the userObjectStore
        let transaction = dataBase.transaction("userObjectStore", "readwrite");
        // Make a reference to the userObjectStore
        let userObjectStore = transaction.objectStore("userObjectStore");
        // Store the user in objectStore for long term storage, with key 1
        userObjectStore.put(user, 1);
        // Store the user in localStorage for fast sync access, with key "token"
        localStorage.setItem('user', JSON.stringify(user));
        console.log("Successfully saved user to indexedDB and localStorage");
    };
};

// Function to remove user from indexedDB and localStorage (called when user logs out)
function removeUser(){
    // Make a transaction object that has "read and write" access to the userObjectStore
    let transaction = dataBase.transaction("userObjectStore", "readwrite");
    // Make a reference to the userObjectStore
    let userObjectStore = transaction.objectStore("userObjectStore");
    // Delete the token in objectStore, with key 1
    userObjectStore.delete(1);
    // Remove the user in localStorage, with key "user"
    localStorage.removeItem("user");
    console.log("Successfully removed user from indexedDB and localStorage");
};

// Function to save passed in token to indexedDB and localStorage     
function saveToken(token){
    if (token !== ""){
        // Make a transaction object that has "read and write" access to the tokenObjectStore
        let transaction = dataBase.transaction("tokenObjectStore", "readwrite");
        // Make a reference to the tokenObjectStore
        let tokenObjectStore = transaction.objectStore("tokenObjectStore");
        // Store the token in objectStore for long term storage, with key 1
        tokenObjectStore.put(token, 1);
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
        return false;
    };
};

// Function to remove token from indexedDB and localStorage (called when user logs out)
function removeToken(){
    // Make a transaction object that has "read and write" access to the tokenObjectStore
    let transaction = dataBase.transaction("tokenObjectStore", "readwrite");
    // Make a reference to the tokenObjectStore
    let tokenObjectStore = transaction.objectStore("tokenObjectStore");
    // Delete the token in objectStore, with key 1
    tokenObjectStore.delete(1);
    // Remove the token in localStorage, with key "token"
    localStorage.removeItem("token");
    console.log("Successfully removed token from indexedDB and localStorage");
    removeUser();
};

module.exports = {
    saveUser,
    removeUser,
    saveToken,
    tokenIsValid,
    removeToken
};