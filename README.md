# streamer
## Splunk - Twitter - Node App. ##
### Use Splunk to Visualize node generated data. ###
*Pull Tweets with Geo Info using node, twitt, twitter, redis and others*

Screen Shot:
![Global Tweets](https://cloud.githubusercontent.com/assets/4219465/11185900/a11be9d8-8c44-11e5-838a-9caff3c83a40.png)

# installation
1. Pull the repos.

2. You will need a set of twitter app creditials. https://apps.twitter.com/
update : credentials.js with your settings. 

3. If you are testing redis.. You will need it running *somewhere*; make changes
to rediscreds.js as needed. [fyi.. that is just a test script]: You will have to
figure out how / what you want to implement in Redis.

4. Decide if you want to use a Splunk Forwarder or Stand-Alone.
5. Create the Index to hold your data: ie.: twitter_sandbox
6. Splunk Forwarder.

Configure your reciever port address

    $ sudo bin/splunk list forward-server
    $ sudo bin/splunk add forward-server 10.10.10.10:9997 -auth admin:changeme
  
Add Monitor (on the machine where you are runing the streamer)

    $ sudo bin/splunk add monitor /locofstreamer/name_of_topic_file.json -index twitter_sandbox
  
8. Splunk Stand - Alone
*Use the GUI to add a directory or file Data Input.*
 
9. Add the splunk queries located in splunk directory of this repos (manually) to your splunk installation.
These are a series of splunk queries.  You will need to add vizi's around the result in next steps.

10. Build a Dashboard [see the sample PNG for an idea of panels and visuals].

#### This will start Node and output to a local file; the file will be forwarded to splunk for analysis. 
11. Start the app appGeoTest.js: 
node appGeoTest.js

12. Wow your friends: Show them your Awesome Dashboard of World Wide Tweets.

Keywords:Splunk, Node, Node.js Twitter Streamer using twit, redis and Twitter stream.
