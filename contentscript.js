// Global variables
var timeout = null;
var timeoutValue = 500;

function notifyArtistListener(artistId) {
	console.log("in notifyArtistListener. artistId:" + artistId);	  
	chrome.extension.sendRequest({search_term: artistId}, function(response) {});
}

function listener()
{
  Songkick.documentListener(document, notifyArtistListener);
}

// The Ajax listener event that fires when the DOM has been modified
document.addEventListener("DOMSubtreeModified", function() {
  if(timeout) {
      clearTimeout(timeout);
  }
  timeout = setTimeout(listener, timeoutValue);
}, false);
