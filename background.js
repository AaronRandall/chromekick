var data = {}; // Object storing data indexed by tab id

function onRequest(request, sender, sendResponse) {
	// Show the page action for the tab that the sender (content script)
	// was on.
	console.log("* " + request['search_term'])
	
	data[sender.tab.id] = request['search_term']
	
	// Show the SK icon in the address bar
	chrome.pageAction.show(sender.tab.id);

	var popupWindows = chrome.extension.getViews({type:'popup'});

	if (popupWindows.length) { // A popup has been found
		// details is the object from the onMessage event (see 2)
		console.log("* popup found")
		popupWindows[0].whatever(details.message, details.sendResponse);
	}
	else {
		console.log("* could not find popup")
	}
  
	// Return nothing to let the connection be cleaned up.
	sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
