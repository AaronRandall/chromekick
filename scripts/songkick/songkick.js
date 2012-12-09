var Songkick = {
  // Analyse a document for artist names and call 
  // the provided callback function with an artist id
  documentAnalyser: function(doc, hostname, callback) { 
    artistName = Songkick.getArtistNameFromDocument(doc, hostname);
    
    // If an artist name was found on the page, and it's not the same as the last
    // one found, send a notification to the artistListener to handle it
    if (artistName && (artistName !== Globals.previousArtistName)){
      Globals.previousArtistName = artistName;
      Songkick.getArtistIdFromName(artistName, callback);	
    }	else {
      Log.debug("Artist (" + artistName + ") already found, not searching SK API for artist ID.")
    }
  },

  // Attempt to extract an artist name from a document
  getArtistNameFromDocument: function(doc, hostname) {
    // Check if the hostname is from our defined list
    if (!Globals.hostnameDefinitionSearched) {
      Log.debug("global artist lookup def is :" + Globals.artistLookupDefinitions);
      Globals.hostnameDefinitionSearched = true;
      Globals.hostnameDefinition = Helper.findValueInJSON(Globals.artistLookupDefinitions, "Hostname", hostname);
    }

    if (!Globals.hostnameDefinition) {
      // Hostname not recognised, skip processing this page
      Log.debug("Hostname '" + hostname + "' not recognised, skipping.");
      return null;
    }

    var extractedArtistName;
    
    // Search the url for an artist string using the defined XPATH query
    nodes = doc.evaluate(Globals.hostnameDefinition.Query, doc, null, XPathResult.ANY_TYPE, null)
    resultNode = nodes.iterateNext();
    if (resultNode) {
      resultNode = resultNode.textContent;
      if (resultNode) {
        extractedArtistName = resultNode
      }
    }

    if (extractedArtistName) {
      return $.trim(extractedArtistName);
    }
    
    return null;
  },

  // Attempt to get a Songkick artist id from a string name, using the Songkick API
  getArtistIdFromName: function(artistName, callback) {
    var url = Constants.apiPath + "search/artists.json?query=" + artistName + "&apikey=" + Constants.apiKey;
    Service.get(url, callback, Songkick.getArtistIdFromName_complete);
  },

  // Callback for: Attempt to get a Songkick artist id from a string name, using the Songkick API
  getArtistIdFromName_complete: function(response, callback) {
    Log.debug("In getArtistIdFromName_complete with response " + response)

    // If the results contain artist(s) info, extract and use the first result
    if (response.resultsPage.results.artist) {
      artistId = response.resultsPage.results.artist[0].id; 

      Globals.previousArtistName = artistName;

      Log.debug("Artist found with name:'" + artistName + "', and id:" + artistId);

      // Call the callback (notifyArtistListener in contentscript.js)
      callback(artistId, artistName);
    } else {
      Log.debug("Couldn't find an artist from the response");
    }
  }

};
