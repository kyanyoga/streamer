// start of file:
var redis = require('redis');
var rediscreds = require('./rediscreds.js');

// open redis client -- note rediscreds abstracted from export
// var redisClient = redis.createClient( rediscreds.REDIS_PORT, rediscreds.REDIS_URL );
// redisClient.auth(rediscreds.REDIS_PRIM);

// use local host or on network host
var redisClient = redis.createClient ( 6379, '172.17.214.224');

// create connection
redisClient.on('connect', function(err, response) {
    if (err) console.log(err);
	console.log('connected...');
});

// select database 15 -- note there are 15 by default
redisClient.select(15, function(error) {
	if (error) { console.log(error);}
	else {console.log('DB : 15 Selected');}
});

// clean the database
redisClient.flushdb();

// ops vars
var arrayOfTopics = ['pie']; // topics
var tp = ''; // topics

// Creating from redis-cli : RPUSH twitterTopics "holiday" "golf" "health" "analytics" "nfl"
// create a list using node where the 1st element is the name 
// TODO: Add topic by form and text file. 7/16/15 GS [ ] 
redisClient.rpush([
                   'topics', 'nfldraft', 'espn', 'nfl'                
                  ], function(err, response) {
    console.log(response); //prints 5
});

redisClient.rpush([
                   'inactivehost', 100, 101, 102, 103, 104, 105, 110, 120, 130, 140, 150                
                  ], function(err, response) {
    console.log(response); //prints 5
});
// rpoplpush inactivehost activehost


// retrive the stored values
redisClient.lrange('topics', 0, -1, function(err, topics) {
    if (err) console.log(err);
    tp = topics;
    // console.log(tp);
    
    // cycle through - create sent
    tp.forEach(function (tp) {
 	// console.log(tp);
        // clear out counters
        redisClient.set(tp, 0, function(err, response) {
            if (err) console.log(err);
            console.log('Counter Reset:'+tp+' '+response);
        });
        // clear out sentiment
        redisClient.set(tp+"sent", 0, function(err, response) {
            if (err) console.log(err);
            console.log('Sentiment Reset:'+tp+' '+response);
        });
        // clear out subjectivity
        redisClient.set(tp+"subj", 0, function(err, response) {
            if (err) console.log(err);
            console.log('Subjectivity Reset:'+tp+' '+response);
        });
    });
});

// RPUSH inactivehost 100 101 102 103 104 105 110 120 130 140 150

// RPUSH twitterTopics "holiday" "golf" "health" "analytics" "ncaa" "starwars" "peace" "pie" "scuba"
 
// RPUSH twitterTopics "water" "kobebeef" "onions" "bigdata" "travel" "news"	 

// TODO: 
// redisClient.del('topics');

// clean the database
//redisClient.flushdb()
