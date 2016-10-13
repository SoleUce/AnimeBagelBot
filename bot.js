console.log("It works")
console.log(re)
var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);


//
//Manualy post a pic
//
function Manual(eventMsg) {
var text = evenMsg.source.text;
if (text == '@AnimeBagelBot post') {
	tweetPic();
	}
};

tweetPic();
setInterval(tweetPic, 1000 * 86400)

tweetFact();
setInterval(tweetFact, 1000 * 86400 * 2)

tweetZero();
setInterval(tweetZero, 1000 * 86400)

//
//RE zero
//
function tweetZero() {
	tweetIt("I love Re;Zero")
};
//
//Tweeet Bagel Facts
//
function tweetFact() {

var P = Math.floor(Math.random()*13)+1

if (P == 1) {
	var rFact = "Bagel history dates back to 1783, according to popular belief. There was this Polish fellow that bet up some turks with his loaf of bread. The country of Austria celebrated by creating a round loaf of bread, as circles where his favourite shape."
};

if (P == 2) {
	var rFact = "Bagels are the only bread that are boiled before baked. Once the bagel dough is shaped into a circle, they are dipped in boiling water for 3 to 5 minutes on each side. After that, they are drained and baked for about 10 minutes."
};

if (P == 3) {
	var rFact = "The whole in the middle of the bagel Isnt just for looks, the men of austria would put theire fingers in the whole and wear them as jewlrey to show thiere class."
};

if (P == 4) {
	 var rFact = "Too brain dead to eat a bagel and drink your coffe, well some guy called Robert Bohannon puts caffine pills into his bagel."
};

if (P == 5) {
	var rFact = "Every one seems to like plain bagels, for some reason pepole like putting cream chese and salmon in bagels like me."
};

if (P == 6) {
	var rFact = "National bagel day is an actual thing, its on Febuary the 9th"
};

if (P == 7) {
	var rFact = "Americans enjoy bagels, In 2015, Thomas' Bagels alone sold 162 million bagels to U.S. consumers."
};

if (P == 8) {
	var rFact = "Bagels are alright -Kieran"
};

if (P == 9) {
        var rFact = "Bagels are circular"
};

if (P == 10) {
       var rFact = "The nutritional value of a bagel is 5"
};

if (P == 11) {
        var rFact = "Here's a little known fact, there is a hole in the middle"
};

if (P == 12) { 
        var rFact = "Did you know Bagels are eaten?"
};

if (P == 13) {
        var rFact = "A bagel is born every second"
};

tweetIt(rFact);
};

//
//Search For Bagels
//

var params = {
	q: 'bagel since: 2015-12-12',
	count:50 
};

T.get('search/tweets', params, gotData)

function gotData(err, data, response) {
	var tweets = data.statuses;
	for (var i = 0; i < tweets.length; i++) {
	console.log(tweets[i].text)
	}
}
//Follow Back
var stream = T.stream('user');

//When someone Follows
stream.on('follow', followed);

var M = Math.floor(Math.random()*4)+1

if (M == 1) {
	rThank = "The Bagel Gods thank you "
};

if (M == 2) {
	rThank = "It's not like I want you to follow me or anything b-b-bagel but thanks anyway "
};

if (M == 3) {
	rThank = "Good Choice "
};

function followed(eventMsg) {
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt('@' + screenName + ' ' + rThank + name)
}

//When someone tweets
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
//
//Random Messages
//
var M = Math.floor(Math.random()*4) + 1

if (M == 4) {
	var rMessage = "Want to here a bagel fact? Well so do I."
};

if (M == 2) {
	var rMessage = "There's been colder days."
};

if (M == 3) {
	var rMessage = "When ever i'm stuck I think want would Ned Stark do? and I think he would write some pretty good code."
};

if (M == 1) {
	var rMessage = "You like girls, what are you gay?"
};

console.log(rMessage)


	//var fs = require('fs');
	//var json = JSON.stringify(eventMsg,null,2);
	//fs.writeFile("tweet.json", json);


	var replyto = eventMsg.in_reply_to_screen_name;
	var	event = eventMsg.text;
	var from = eventMsg.user.screen_name;

	console.log(replyto + ' ' + from);

	if (replyto == 'AnimeBagelBot') {
		var newtweet = "Thank You " + '@' + from + " " + rMessage
		tweetIt(newtweet);
	}

}

//
//Tweet A message
//
function tweetIt(txt) {

	var tweet = {
		status: txt
	}

	T.post('statuses/update', tweet) 
	
}


//
// post a pic
//

function tweetPic() {
	var r = Math.floor(Math.random()*59) + 1;
	var fileName ='Pics/' + r + '.png'
	var fs = require('fs')
	var b64content = fs.readFileSync(fileName, { encoding: 'base64' }) 

	// first we must post the media to Twitter
	T.post('media/upload', { media_data: b64content }, function (err, data, response) {
	  // now we can assign alt text to the media, for use by screen readers and
	  // other text-based presentations and interpreters
	  var mediaIdStr = data.media_id_string
	  var altText = "Nice Bagel M8."
	  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

	  T.post('media/metadata/create', meta_params, function (err, data, response) {
	    if (!err) {
	      // now we can reference the media and post a tweet (media will attach to the tweet)
	      var params = { status: 'Bagels brought to you by #SolesBagelBot', media_ids: [mediaIdStr] }

	      T.post('statuses/update', params, function (err, data, response) {
	        console.log(data)
	      })
	    }
	  })
	})
}

