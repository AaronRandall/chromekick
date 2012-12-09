var Globals = {
  previousArtistName: null,
  hostnameDefinition: null,
  hostnameDefinitionSearched: false,
  artistLookupDefinitions: null
};

// Logic below this line is responsible for retrieving and storing
// the remote artistLookupDefinitions JSON file.
var storageKey = 'artistLookupDefinitions';
var storage = chrome.storage.local;

// Uncomment to clear localStorage key
Log.debug("localStorage for Chromekick is being cleared")
storage.remove(storageKey);

Log.debug('loading definitions file from local');
var loadDefinitionsFromFile = true;

if (loadDefinitionsFromFile) {
  Globals.artistLookupDefinitions = localArtistLookupDefinitions;
} else {

  storage.get(storageKey,function(response){
    if (!response[storageKey]) {
      Log.debug(storageKey + " doesn't exist in localStorage, attempting to populate now");
      Service.get(Constants.definitionsUri, null, definitionsCallback);
    } else {
      Log.debug(storageKey + " value is stored already, as:", response);
      Globals.artistLookupDefinitions = response["artistLookupDefinitions"];
      Log.debug("set artistlookupdefs to :" + Globals.artistLookupDefinitions);
    }
  });
}

function definitionsCallback(response, callback) {
  Log.debug("Response is:" + response);
  
  // Write the fetched definition file to local storage
  var obj= {};
  obj[storageKey] = response;
  storage.set(obj);

  // Assign the fetched definition file to global var
  Globals.artistLookupDefinitions = response;

  Log.debug("global artist definition = " + Globals.artistLookupDefinitions);
}


