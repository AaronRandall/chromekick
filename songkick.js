var Songkick = {


    getArtistNameFromDocument: function(doc) {
		console.log("searching for artists");
		
		var artist_name;
		
		// Search YouTube
		var nodes = doc.evaluate("//span[@class='metadata-info']/a", doc, null, XPathResult.ANY_TYPE, null)
		var resultNode = nodes.iterateNext()
		if (resultNode) {
		   artist_name = resultNode.innerHTML
		}
		
		// Search Pitchfork
		if (!artist_name) {
			nodes = doc.evaluate("//ul[@class='outbound']/li/a/text()", doc, null, XPathResult.ANY_TYPE, null)
			resultNode = nodes.iterateNext();
			if (resultNode) {
				resultNode = resultNode.textContent;
			
				if (resultNode) {
					artist_name = resultNode
				}
			}
		}
		
		// Search Deezer
		if (!artist_name) {
			nodes = doc.evaluate("//h1[@id='naboo_artist_name']", doc, null, XPathResult.ANY_TYPE, null)
			resultNode = nodes.iterateNext();
			resultNode = resultNode.textContent;
			if (resultNode) {
				artist_name = resultNode
			}
		}
		
		if (artist_name) {
			return artist_name;
		}
		
		return null;
    },

    getArtistIdFromName: function(artistName) {
    	var API_KEY = "hackday";
	var API_PATH = "http://api.songkick.com/api/3.0/";

		var url = API_PATH + "search/artists.json?query=" + artistName + "&apikey=" + API_KEY;
		var xhr = new XMLHttpRequest();

		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				//handle the xhr response here
				console.log("RESPONSE RECEIVED");
				console.log(xhr);
				if (xhr.status === 200) {
				//console.log(xhr.responseText);
				}
			}
		}

		xhr.send();
    }
};