var Axios = require('axios');

function getRepos(username) {
  return Axios.get('https://api.github.com/users/' +username +'/repos');
}

function getUserInfo(username){
  return Axios.get('https://api.github.com/users/' +username );
}

var Helpers = {
  getGitHubInfo : function(username){
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
