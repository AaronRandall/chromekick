// Global variables
var timeout = null;
var timeoutValue = 1500;
var artistFound = false;
var lastArtistName;

function notifyArtistListener(artistName) {
	console.log("in notifyArtistListener. artist name:" + artistName);	  
	//chrome.extension.sendRequest({search_term: artist_name}, function(response) {});
}

function listener()
{
    artistName = Songkick.getArtistNameFromDocument(document);
    console.log("ArtistName is " + artistName)
    
    // If an artist name was found on the page, and it's not the same as the last
    // one found, send a notification to the artistListener to handle it
    if (artistName && (artistName !== lastArtistName)) {
    	artistId = Songkick.getArtistIdFromName(artistName);	
    
    	console.log("New artist found");
    	lastArtistName = artistName;
		notifyArtistListener(artistName);
	}    
	else {
		console.log("Artist (" + artistName + ")already found, not searching.")
	}
}

// The Ajax listener event that fires when the DOM has been modified
document.addEventListener("DOMSubtreeModified", function() {
    if(timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(listener, timeoutValue);
}, false);