const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(error, results) {
    if (error) {
      callback(error, null);
    } else {
      var parsed = JSON.parse(results.body);
      callback(null, parsed)
    }
  })

}

module.exports.getReposByUsername = getReposByUsername;