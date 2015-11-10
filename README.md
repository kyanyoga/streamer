# streamer
## Splunk - Twitter - Node App. ##
### Use Splunk to Visualize node generated data. ###
## Pull Tweets with Geo Info using node, twitt, twitter, redis and others

# installation
1. Pull the repos.

2. You will need a set of twitter app creditials. https://apps.twitter.com/
update : credentials.js with your settings. 

3. If you are testing redis.. You will need it running *somewhere*; make changes
to rediscreds.js as needed. [fyi.. that is just a test script]: You will have to
figure out how / what you want to implement in Redis.

4. Decide if you want to use a Splunk Forwarder or Stand-Alone.
  a. Create the Index to hold your data.
  b. Splunk Forwarder
    I.  Configure your reciever port address.
        sudo bin/splunk list forward-server
        sudo bin/splunk add forward-server 10.10.10.10:9997 -auth admin:changeme 
    II. Add Monitor (on the machine where you are runing the streamer).
        sudo bin/splunk add monitor /locofstreamer/name_of_topic_file.json -index twitter_sandbox
  
  c. Splunk Stand - Alone
    Use the GUI to add a directory or file Data Input.
 
5. Add the splunk queries [located in splunk directory of this repos] (manually) to your splunk installation.

6. Build a Dashboard [see the sample PNG for an idea of panels and visuals].

7. Start the app of your choice [app.js, appGeoTest.js ...etc]

9. Wow your friends: Show them you Awesome Dashboard of World Wide Tweets.

Keywords:Splunk, Node, Node.js Twitter Streamer using twit, redis and Twitter stream.
