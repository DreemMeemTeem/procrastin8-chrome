// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
var timer = new Timer();
var tracker = new Tracker();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
  case 'startTimer':
    timer.start()
    break;
  case 'stopTimer':
    timer.stop()
    break;
  case 'resetTimer':
    timer.reset()
    break;
  case 'getTimerStatus':
    sendResponse(timer.getState());
    break;
  default:
    // nothing here
  }
});