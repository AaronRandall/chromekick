var artistId;
var accessToken;

var googleAuth = new OAuth2('google', {
  client_id: Constants.oauthClientId,
  client_secret: Constants.oauthClientSecret,
  api_scope: Constants.oauthApiScope
});

googleAuth.authorize(function() {
  // Ready for action, can now make requests with
  console.log("** attempting to authorize with songkick oauth2");
  accessToken = googleAuth.getAccessToken();
  console.log("** got access token of:" + accessToken);
});

chrome.tabs.getSelected(null, function(tab) {
	console.log("* in get selected")
	console.log("* tab id is:" + tab.id)
  	artistId = chrome.extension.getBackgroundPage().data[tab.id][0];
  	artistName = chrome.extension.getBackgroundPage().data[tab.id][1];
  	
  	// debug, show the artist name
  	console.log("artistId is " + artistId);
  	console.log("artistName is " + artistName);

    document.getElementById("artist-name").innerHTML = artistName;
    document.getElementById("track").addEventListener('click', clickHandler); 
    getArtistUpcomingEvents(artistId);
});

function clickHandler(e) { PopupClick('SHOW'); }

function PopupClick(str) {
  console.log("button clicked");
  //trackArtistWithId(artistId);
  //checkIfTrackingArtistWithId(artistId);
}

function checkIfTrackingArtistWithId(artistId) {
  console.log("** Attempting to see if already tracking artist");

  var apiUrl = "https://api-staging.songkick.net/api/3.0";
  var trackingUrl = "/users/:me/trackings/artist:" + artistId + ".json?apikey=hackday"
 
  var requestUrl = apiUrl + trackingUrl;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", requestUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', 'OAuth ' + accessToken);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
    console.log("got something back from server");
      // innerText does not let the attacker inject HTML elements.
      console.log(xhr.responseText);
    }
  }
  xhr.send();
  console.log("** Tracking check complete");
}

function trackArtistWithId(artistId) {
  console.log("** Attempting to track artist");

  var apiUrl = "https://api-staging.songkick.net/api/3.0";
  var trackingUrl = "/users/:me/trackings/artist:" + artistId + ".json?apikey=hackday"
 
  var requestUrl = apiUrl + trackingUrl;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", requestUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', 'OAuth ' + accessToken);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
    console.log("got something back from server");
      // innerText does not let the attacker inject HTML elements.
      console.log(xhr.responseText);
    }
  }
  xhr.send();
  console.log("** Artist should be tracked");
}


function getArtistUpcomingEvents(artistId) {
  console.log("** getting artist upcoming events");

http://api.songkick.com/api/3.0/artists/705029/calendar.json?apikey=hackday&order=desc&page=1&per_page=3
  var apiUrl = "https://api-staging.songkick.net/api/3.0";
  var trackingUrl = "/artists/" + artistId + "/calendar.json?apikey=hackday&order=desc&page=1&per_page=3"
 
  var requestUrl = apiUrl + trackingUrl;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", requestUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', 'OAuth ' + accessToken);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
    console.log("got something back from server");
      // innerText does not let the attacker inject HTML elements.
      console.log(xhr.responseText);
var eventsData = JSON.parse(xhr.responseText);
var events = eventsData["resultsPage"]["results"]["event"];
var eventsString = '';

if (!events) {
document.getElementById("artist-upcoming-events-title").innerHTML = "No upcoming events";
} else {

  for (var i = 0; i < events.length; i++) {
      console.log(events[i]);
        //Do something
        eventsString = eventsString + '<a href="' + events[i]["uri"] + '">' + events[i]["displayName"] + '</a><br />';
        }
}

  document.getElementById("artist-upcoming-events").innerHTML = eventsString;
      formatUpcomingEvents(xhr.responseText);
    }
  }
  xhr.send();
  console.log("** upcoming events fetch complete");
}

function formatUpcomingEvents(eventData) {
}
