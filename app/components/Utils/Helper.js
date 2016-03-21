var Axios = require('axios');
/* Gets Repos for a particular user */
function getRepos(username) {
  return Axios.get('https://api.github.com/users/' +username +'/repos');
}

/* GEts Profile info for a particular user */
function getUserInfo(username){
  return Axios.get('https://api.github.com/users/' +username );
}

var Helpers = {
  getGitHubInfo : function(username){
    /* Axios.all would wait untill data for both getRepos and getUserInfo is fetched */
    return Axios.all([getRepos(username), getUserInfo(username)])
    .then (function(arr){
      return{
        repos : arr[0].data,
        bio : arr[1].data
      }
    });
  }
};

module.exports = Helpers;
