var artistName;

chrome.tabs.getSelected(null, function(tab) {
	console.log("* in get selected")
	console.log("* tab id is:" + tab.id)
  	artistName = chrome.extension.getBackgroundPage().data[tab.id];
  	
  	// debug, show the artist name
  	console.log("artistName is " + artistName);
  	//document.getElementById('artist-name').innerHTML = artistName;
  	
  	// on iframe load, remove the loading bar
  	document.getElementById("songkick-iframe").onload = function() {
  		document.getElementById("debug-window").style.display = 'none';
	};
	
	// load the remote page in the iframe
  	window.frames['songkick-iframe'].document.location.href = "http://tourbox.songkick.local:8080/search/" + artistName
});

