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
console.log("localStorage for Chromekick is being cleared")
storage.remove(storageKey);

console.log('loading definitions file from local');
var loadDefinitionsFromFile = true;

if (loadDefinitionsFromFile) {
  Globals.artistLookupDefinitions = localArtistLookupDefinitions;
} else {

  storage.get(storageKey,function(response){
    if (!response[storageKey]) {
      console.log(storageKey + " doesn't exist in localStorage, attempting to populate now");
      Service.get(Constants.definitionsUri, null, definitionsCallback);
    } else {
      console.log(storageKey + " value is stored already, as:", response);
      Globals.artistLookupDefinitions = response["artistLookupDefinitions"];
      console.log("set artistlookupdefs to :" + Globals.artistLookupDefinitions);
    }
  });
}

function definitionsCallback(response, callback) {
  console.log("Response is:" + response);
  
  // Write the fetched definition file to local storage
  var obj= {};
  obj[storageKey] = response;
  storage.set(obj);

  // Assign the fetched definition file to global var
  Globals.artistLookupDefinitions = response;

  console.log("global artist definition = " + Globals.artistLookupDefinitions);
}


