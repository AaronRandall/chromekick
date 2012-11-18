var Globals = {
  previousArtistName: null,
  hostnameDefinition: null,
  hostnameDefinitionSearched: false
};


var storageKey = 'artistLookupDefinitions';
var storage = chrome.storage.local;
var artistLookupDefinitions = "empty";

//storage.remove(storageKey);

storage.get(storageKey,function(response){
  if (!response[storageKey]) {
    console.log(storageKey + " doesn't exist in localStorage, attempting to populate now");
    console.log("starting defitions fetch");
    Service.get(Constants.definitionsUri, null, definitionsCallback);
  } else {
    console.log(storageKey + " value is stored already, as:", response);
    artistLookupDefinitions = response["artistLookupDefinitions"];
    console.log("set artistlookupdefs to :" + artistLookupDefinitions);
  }
});

function definitionsCallback(response, callback) {
  console.log("Response is:" + response);
  
  // Write the fetched definition file to local storage
  var obj= {};
  obj[storageKey] = response;
  storage.set(obj);

  // Assign the fetched definition file to global var
  artistLookupDefinitions = response;

  console.log("global artist definition = " + artistLookupDefinitions);
}


