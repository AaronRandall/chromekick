var Helper = {

  findValueInJSON: function(jsonObject, jsonKey, valueToFind) {
    for (var index = 0; index < jsonObject.length; ++index) {

     var current = jsonObject[index];
     console.log("* current json is" + current);

      if(current[jsonKey] == valueToFind) {
         return current;
         break;
       }
     }

     return null;
  },


  extractCoreHostnameDetails: function(hostname) {
     return hostname.replace('www.', '');
  }

};
