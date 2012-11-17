var PREVIOUS_ARTIST_NAME;
var API_KEY = "hackday";
var API_PATH = "http://api.songkick.com/api/3.0/";

var Songkick = {

  documentListener: function(doc, callback) { 
    artistName = Songkick.getArtistNameFromDocument(document);
    console.log("ArtistName is " + artistName)
    
    // If an artist name was found on the page, and it's not the same as the last
    // one found, send a notification to the artistListener to handle it
    console.log("artistName is:" + artistName + ", PREVIOUS_ARTIST_NAME:" + PREVIOUS_ARTIST_NAME);
    if (artistName && (artistName !== PREVIOUS_ARTIST_NAME)) {
      Songkick.getArtistIdFromName(artistName, callback);	
    }	else {
      console.log("Artist (" + artistName + ")already found, not searching.")
    }
  },

  getArtistNameFromDocument: function(doc) {
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
      return $.trim(artist_name);
    }
    
    return null;
  },

  getArtistIdFromName: function(artistName, callback) {
    var url = API_PATH + "search/artists.json?query=" + artistName + "&apikey=" + API_KEY;
    Service.get(url, callback, Songkick.getArtistIdFromName_complete);
  },

  getArtistIdFromName_complete: function(response, callback) {
    console.log("In getArtistIdFromName_complete with response " + response)
    artistName =  response.resultsPage.results.artist[0].displayName; 
    artistId = response.resultsPage.results.artist[0].id; 

    console.log("Artist found with name:" + artistName + ", and id:" + artistId);

    PREVIOUS_ARTIST_NAME = artistName;

    callback(artistId);
  }

};
