var Songkick = {
  // <summary>
  // Analyse a document for artist names and call 
  // the provided callback function with an artist id
  // </summary>
  documentAnalyser: function(doc, hostname, callback) { 
    artistName = Songkick.getArtistNameFromDocument(doc, hostname);
    
    // If an artist name was found on the page, and it's not the same as the last
    // one found, send a notification to the artistListener to handle it
    if (artistName && (artistName !== GlobalVars.previousArtistName)){
      GlobalVars.previousArtistName = artistName;
      Songkick.getArtistIdFromName(artistName, callback);	
    }	else {
      console.log("Artist (" + artistName + ")already found, not searching.")
    }
  },

  // <summary>
  // Attempt to extract an artist name from a document
  // </summary>
  getArtistNameFromDocument: function(doc, hostname) {
    // Check if the hostname is from our defined list
    if (!GlobalVars.hostnameDefinitionSearched) {
      GlobalVars.hostnameDefinitionSearched = true;
      GlobalVars.hostnameDefinition = Helper.findValueInJSON(ARTIST_HOSTNAME_DEFINITIONS, "Hostname", hostname);
    }

    if (!GlobalVars.hostnameDefinition) {
      // Hostname not recognised, skip processing this page
      console.log("Hostname '" + hostname + "' not recognised, skipping.");
      return null;
    }

    var extractedArtistName;
    
    // Search the url for an artist string using the defined XPATH query
    nodes = doc.evaluate(GlobalVars.hostnameDefinition.Query, doc, null, XPathResult.ANY_TYPE, null)
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

  // <summary>
  // Attempt to get a Songkick artist id from a string name, using the Songkick API
  // </summary>
  getArtistIdFromName: function(artistName, callback) {
    var url = Constants.apiPath + "search/artists.json?query=" + artistName + "&apikey=" + Constants.apiKey;
    Service.get(url, callback, Songkick.getArtistIdFromName_complete);
  },

  // <summary>
  // Callback for: Attempt to get a Songkick artist id from a string name, using the Songkick API
  // </summary>
  getArtistIdFromName_complete: function(response, callback) {
    console.log("In getArtistIdFromName_complete with response " + response)

    // If the results contain artist(s) info, extract and use the first result
    if (response.resultsPage.results.artist) {
      artistId = response.resultsPage.results.artist[0].id; 

      GlobalVars.previousArtistName = artistName;

      console.log("Artist found with name:'" + artistName + "', and id:" + artistId);

      // Call the callback (notifyArtistListener in contentscript.js)
      callback(artistId);
    } else {
      console.log("Couldn't find an artist from the response");
    }
  }

};
