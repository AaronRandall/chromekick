var Service = {

  get: function(url, callback, serviceCallback) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        //handle the xhr response here
        console.log(xhr);
        if (xhr.status === 200) {
          var jsonResponse = JSON.parse(xhr.responseText);
          console.log(jsonResponse);
          serviceCallback(jsonResponse, callback);
        } else {
          console.log("Invalid response received");
          return null;
        }
      }
    }

    xhr.send();
  }

};
