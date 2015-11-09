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

// test code from library
// tweet timeline
/*var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});*/

/*// get favorites list
client.get('favorites/list', function(error, tweets, response){
  if(error) throw error;
  console.log(tweets);  // The favorites. 
  console.log(response);  // Raw response object. 
});*/

// adjust for specific files and totals
var total=0;
var totalSent=0;
var outputFilename = 'nd_tweet_topic_splunk_a.json';

// stream functions  -- firehose of locations // track: 'nfl,football,espn' // // try adding track
var stream = T.stream('statuses/filter',
                      { track: 'nfl, superbowl, football, espn, cowboys, dolphins, 49ers, eagles, \
                       packers, partriots, raiders, rams, ravens, rookie, sports, sportscenter, \
                       steelers, vikings, collegefootball, athletics, seahawks, greenbay, bengals \
                       browns, falcons, texans, colts, giants, saints, buccaneers, chargers, cardinals \
                       cheifs, jets' });  

// async catch error
stream.on('error', function (error) {
    throw error;
});


// async catch limitations from Twitter    
stream.on('limit', function (limitMessage) {
    console.log("Limit:"+JSON.stringify(limitMessage));
});


stream.on('tweet', function (tweet) {
    
    // get topics
       var topics = tweet.text.match(/(^|\s)#([^ ]*)/g);
       console.log('topics: ' + topics);
       // console.log(tweet.text);
    
       totalSent+=1;
       if(totalSent%100==0)console.log("Sent:"+totalSent);
       var smallTweet={
            time: moment().format('YYYY-MM-DD HH:MM:SS'),     
            text:tweet.text,
            topics: topics, 
            user:{  screen_name:       tweet.user.screen_name,
                    profile_image_url: tweet.user.profile_image_url,
                    id_str:            tweet.user.id_str}
            };
    
        // console.log('stream: ' + smallTweet);
        fs.appendFile(outputFilename, JSON.stringify(smallTweet, null, 4), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + outputFilename);
            }
        });
});
