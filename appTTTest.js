// base libs
var Twitter = require('twitter');                       /* https://www.npmjs.com/package/twitter */
var credentials = require('./credentials.js');

var arrayOfTopics = ['nfl']; // topics

var client = new Twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret

    //,
    //request_options: {
    //    proxy: 'https://proxy.compaq.com:8080'
    //}
})


// tweet timeline
/*var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});*/

// get favorites list
client.get('favorites/list', function(error, tweets, response){
  if(error) throw error;
  console.log(tweets);  // The favorites. 
  console.log(response);  // Raw response object. 
});

// {track: 'superbowl, humble bundle'}

client.stream('statuses/filter', { track: 'nfl, superbowl, football' }, function (stream) {
    stream.on('data', function (tweet) {
        console.log(tweet.text);
    });
    
    stream.on('error', function (error) {
        throw error;
    });
});
