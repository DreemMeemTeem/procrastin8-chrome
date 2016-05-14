$(document).ready(function() {
  forceSetTimerValue();
})

$('#timer-startButton').click(function() {
  chrome.runtime.sendMessage({type: 'startTimer'});
  forceSetTimerValue();
})

$('#timer-stopButton').click(function() {
  chrome.runtime.sendMessage({type: 'stopTimer'});
})

function forceSetTimerValue() {
  chrome.runtime.sendMessage({type: 'getTimerStatus'}, function(timer) {
    $('#timer-value').text(timer.value);  // TODO: format as h:mm:ss
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'tick') {
    $('#timer-value').text(request.value);  // TODO: format as h:mm:ss
  }
});