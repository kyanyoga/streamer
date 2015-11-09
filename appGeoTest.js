// base libs
// https://github.com/ttezel/twit : NOTE : This node twitter lib has geo data.
var Twit = require('twit');
var credentials = require('./credentials.js');
var fs = require('fs');
var moment = require('moment');

// create Twit object
var T = new Twit({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

// adjust for specific area : NOTE : look this up and only look at the nothern hemisphere
var world = [ '-120', '-75', '120', '75' ];
var total=0;
var totalSent=0;
var outputFilename = 'nd_tweet_geo_splunk_a.json';

// stream functions  -- firehose of locations // track: 'nfl,football,espn' // // try adding track
var stream = T.stream('statuses/filter', { locations: world  });  

// async catch error
stream.on('error', function (error) {
    throw error;
});


// async catch limitations from Twitter    
stream.on('limit', function (limitMessage) {
    console.log("Limit:"+JSON.stringify(limitMessage));
});

// async main data stream    
stream.on('tweet', function (tweet) {
  if(tweet.geo){
       // console.log('latitude:' + tweet.geo.coordinates[0] + ' longitude:' + tweet.geo.coordinates[1]);
       // var latitude  = tweet.geo.coordinates[0];
       // var longitude = tweet.geo.coordinates[1];
       // console.log('latitude:' +latitude + ' longitude:' + longitude );
       // geo: tweet.geo
       // latitude: latitude,
       // longitude: longitude  // OPTIMIZE:GS
      
       // get topics
       var topics = tweet.text.match(/(^|\s)#([^ ]*)/g);
       console.log('topics: ' + topics);
       
       totalSent+=1;
        if(totalSent%100==0)console.log("Sent:"+totalSent);
        var smallTweet={
          time: moment().format('YYYY-MM-DD HH:MM:SS'),     
          text:tweet.text,
          topics: topics, 
          user:{   screen_name:       tweet.user.screen_name,
                   profile_image_url: tweet.user.profile_image_url,
                   id_str:            tweet.user.id_str},
          // geo: tweet.geo
          latitude: tweet.geo.coordinates[0],
          longitude: tweet.geo.coordinates[1]
        };
        // console.log('stream: ' + smallTweet);
        fs.appendFile(outputFilename, JSON.stringify(smallTweet, null, 4), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + outputFilename);
            }
        }); 
    }
});
