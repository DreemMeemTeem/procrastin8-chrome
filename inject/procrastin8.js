/*chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});*/


var div = document.createElement('div');
div.innerHTML = '<div class="procrastin8-sprite" id="sprite-1"><div class="procrastin8-bubble left"><p>Get back to work, you scum of the earth</p></div></div>';
while (div.children.length > 0) {
  document.body.appendChild(div.children[0]);
}
