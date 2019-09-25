/*in this folder goes all the functions that are going to be used for calling the backend*/


// This is the easiest way i found, if theres a better way let me know
// you can pretty much copy the one i made "idea-queries.js" and "profile-queries.js"
/*
1: Make a file in this directory named {something}-queries.js
2: Put all your functions inside a 
       module.exports = function(){
           return {
               
           }
       }
3: Use ( import * as dataManager from {filePath}) where ever you want to use your functions;
4: Then you can use dataManager().getAllIdeas() or whatever the function is
*/