var artistId;

chrome.tabs.getSelected(null, function(tab) {
	console.log("* in get selected")
	console.log("* tab id is:" + tab.id)
  	artistId = chrome.extension.getBackgroundPage().data[tab.id];
  	
  	// debug, show the artist name
  	console.log("artistId is " + artistId);
  	//document.getElementById('artist-name').innerHTML = artistName;
  	
  	// on iframe load, remove the loading bar
  	document.getElementById("songkick-iframe").onload = function() {
    document.getElementById("debug-window").style.display = 'none';
	};
	
	// load the remote page in the iframe
 // 	window.frames['songkick-iframe'].document.location.href = "http://www.songkick.com/artists/" + artistId;
});


var googleAuth = new OAuth2('google', {
  client_id: '',
  client_secret: '',
  api_scope: ''
});

googleAuth.authorize(function() {
  // Ready for action, can now make requests with
  console.log("** attempting to authorize with songkick oauth2");
  var accessToken = googleAuth.getAccessToken();
  console.log("** got access token of:" + accessToken);

  console.log("** Attempting to track hotchip");
 /* var xhr = new XMLHttpRequest();
    xhr.open('POST', trackingUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'OAuth ' + accessToken);
    xhr.send();
*/

  var apiUrl = "";
  var trackingUrl = ""
 
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
  console.log("** Hot chip should be tracked");

});
