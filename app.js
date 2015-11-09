// start of file:
var redis = require('redis');
var rediscreds = require('./rediscreds.js');

// open redis client -- note rediscreds abstracted from export
// var redisClient = redis.createClient( rediscreds.REDIS_PORT, rediscreds.REDIS_URL );
// redisClient.auth(rediscreds.REDIS_PRIM);

// use local host or on network host
var redisClient = redis.createClient ( 6379, '172.17.214.224');

// select database 15 -- note there are 15 by default
redisClient.select(15, function(error) {
	if (error) { console.log(error);}
	else {console.log('DB : 15 Selected');}
});

// create connection
redisClient.on('connect', function() {
	console.log('connected');
});

// using key counters
redisClient.set('counter1', 1, function() {
    redisClient.incr('counter1', function(err, response) {
        console.log(response); 
    });
});

// - OR --
redisClient.set('counter2', 20);
redisClient.incr('counter2', function(err, response) {
        console.log(response); 
});


// ops vars
var arrayOfTopics = ['pie']; // topics

// Creating from redis-cli : RPUSH twitterTopics "holiday" "golf" "health" "analytics" "nfl"
// create a list using node where the 1st element is the name
redisClient.rpush(['topics', 'holiday', 'golf', 'health' ,'analytics', 'nfl'], function(err, response) {
    console.log(response); //prints 5
});

// Create more topics
redisClient.rpush(['topics', 'starwars', 'backtoschool', 'peace' ,'pie', 'apple'], function(err, response) {
    console.log(response); //prints 5
});


// RPUSH inactivehost 100 101 102 103 104 105 110 120 130 140 150

// RPUSH twitterTopics "holiday" "golf" "health" "analytics" "ncaa" "starwars" "peace" "pie" "scuba"
 
// RPUSH twitterTopics "water" "kobebeef" "onions" "bigdata" "travel" "news"

// retrive the stored values
redisClient.lrange('topics', 0, -1, function(err, response) {
    console.log(response); // see list above
});

// TODO: 
// redisClient.del('topics');

// retrive the stored values
redisClient.lrange('topics', 0, -1, function(err, response) {
    console.log(response); // see list above
});

// create var args array
var settingsSet = ['daysofweek','ALL'];
redisClient.set(settingsSet, function(err, response) {
  console.log(response);
});

redisClient.get('daysofweek', function(err, response) {
  console.log(response);
});

redisClient.incr('global:nextPostId', function(err, response) {
  console.log(response);
});

redisClient.incr('global:nextPostId', function(err, response) {
  console.log(response);
});


// vargs array does not work here.
redisClient.hmset('settings', 'website', 'node', 'database', 'redis', 'source' , 'twitter');
 
redisClient.hgetall('settings', function(err, response) {
    console.log(response);
});


// clean the database
// redisClient.flushdb()
