// require

var keys = require("./keys.js");
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
	id: "47babbf951d44d18a5bb985aaa34edbd",
	secret: "7b217293626c41a2a386b7ba8bcfc592"
});

var request = require('request');

var myTweets = function() {

	var client = new Twitter(keys);
	var param = { screen_name: 'dannypark5', count: 20 };

	client.get('statuses/user_timeline', param, function(error, tweets, response) {
	    if (!error) {
	      var twt = [];
	      for (var i = 0; i < tweets.length; i++) {
	        twt.push({
	            'Date Created: ' : tweets[i].created_at,
	            'Tweet: ' : tweets[i].text,
	        });
	      }
	      console.log(twt);
	    }
	});

};

var getSpotify = function(songName) {
  if (process.argv[3]) {
	  spotify.search({ type: 'track', query: songName }, function(err, data) {
	    
	    var songs = data.tracks.items;
	    var data = [];

	    for (var i = 0; i < songs.length; i++) {
	      data.push({
	        'artist(s)': songs[i].artists[0].name,
	        'song name: ': songs[i].name,
	        'preview song: ': songs[i].preview_url,
	        'album: ': songs[i].album.name,
	      });
	    }
	    console.log(data);
	  });
  }
  else {
  	spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
    
    var songs = data.tracks.items;
    var data = [];

    for (var i = 0; i < songs.length; i++) {
      data.push({
        'artist(s)': songs[i].artists[0].name,
        'song name: ': songs[i].name,
        'preview song: ': songs[i].preview_url,
        'album: ': songs[i].album.name,
      });
    }
    console.log(data);
  });
  }


};

var getMovie = function(movieName) {
	if (process.argv[3]) {
		var url = "http://www.omdbapi.com/?apikey=40e9cece&t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";	

		request(url, function(error, response, body) {
		    if (!error && response.statusCode == 200) {
		      var data = [];
		      var jsonData = JSON.parse(body);

		      data.push({
		      'Title: ' : jsonData.Title,
		      'Year: ' : jsonData.Year,
		      'IMDB Rating: ' : jsonData.imdbRating,
		      'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
		      'Country: ' : jsonData.Country,
		      'Language: ' : jsonData.Language,
		      'Plot: ' : jsonData.Plot,
		      'Actors: ' : jsonData.Actors,
		      });
		      console.log(data);
		    }
        });
	}
	else {
		var url = "http://www.omdbapi.com/?apikey=40e9cece&t=Mr.Nobody&y=&plot=full&tomatoes=true&r=json";

		request(url, function(error, response, body) {
		    if (!error && response.statusCode == 200) {
		      var data = [];
		      var jsonData = JSON.parse(body);

		      data.push({
		      'Title: ' : jsonData.Title,
		      'Year: ' : jsonData.Year,
		      'IMDB Rating: ' : jsonData.imdbRating,
		      'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
		      'Country: ' : jsonData.Country,
		      'Language: ' : jsonData.Language,
		      'Plot: ' : jsonData.Plot,
		      'Actors: ' : jsonData.Actors,
		      });
		      console.log(data);
		    }
        });
	}
};

var doWhatItSays = function() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		var data = data.split(',');
		if (data.length == 2) {
      		choice(data[0], data[1]);
    	} else if (data.length == 1) {
      		choice(data[0]);
    	}
	});	
};

var choice = function(arg1, arg2) {

	switch(arg1) {
		case "my-tweets" :
			myTweets();
			break;
		case "spotify-this-song" :
			getSpotify(arg2);
			break;
		case "movie-this" :
			getMovie(arg2);
			break;
		case "do-what-it-says" :
			doWhatItSays();
			break;
		default :
			console.log("LIRI doesn't understand the command!");
	}

}

choice(process.argv[2], process.argv[3]);