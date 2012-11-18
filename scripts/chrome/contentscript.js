// Send the artistId to the popup to handle displaying the track options
function notifyArtistListener(artistId) {
	console.log("in notifyArtistListener. artistId:" + artistId);	  
	chrome.extension.sendRequest({search_term: artistId}, function(response) {});
}

// The Songkick document listener which handles analysing the document 
// and firing the notifyArtistListener if required
function listener()
{
  currentHostname = Helper.extractCoreHostnameDetails(window.location.hostname);
  Songkick.documentAnalyser(document, currentHostname, notifyArtistListener);
}

// The Ajax listener event that fires when the DOM has been modified
var timeout = null;
document.addEventListener("DOMSubtreeModified", function() {
  if(timeout) {
      clearTimeout(timeout);
  }
  timeout = setTimeout(listener, Constants.domModifiedTimeoutValue);
}, false);
