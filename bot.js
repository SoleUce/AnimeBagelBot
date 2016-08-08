console.log("It works")

var Twit = require('twit');

var config = require('./config');



var T = new Twit(config);


tweetIt();
setInterval(tweetIt, 1000 * 86400)

tweetPic();
setInterval(tweetPic, 1000 * 86400)

//Follow Back
var stream = T.stream('user');

//When someone Follows
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
	var fs = require('fs');
	var json = JSON.stringify(eventMsg,null,2);
	fs.writeFile("tweet.json", json);

}

function tweetIt(txt) {

	var tweet = {
		status: txt
	}



}

//Post Random Number
}

//
// post a pic
//

function tweetPic() {
var r = Math.floor(Math.random()*20) + 1;
var fileName ='Pics/' + r +'.png'
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