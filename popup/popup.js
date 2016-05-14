$(document).ready(function() {
  forceSetTimerValue();
})

$('#timer-startButton').click(function() {
  chrome.runtime.sendMessage({type: 'startTimer'});
  forceSetTimerValue();
  
  $('#timer-startButton').hide();
  $('#timer-stopButton').show();
})

$('#timer-stopButton').click(function() {
  chrome.runtime.sendMessage({type: 'stopTimer'});
  
  $('#timer-startButton').show();
  $('#timer-stopButton').hide();
})

$('#timer-resetButton').click(function() {
  chrome.runtime.sendMessage({type: 'resetTimer'});
  forceSetTimerValue();
  
  $('#timer-startButton').show();
  $('#timer-stopButton').hide();
})

function forceSetTimerValue() {
  chrome.runtime.sendMessage({type: 'getTimerStatus'}, function(timer) {
    $('#timer-value').text(timer.value);  // TODO: format as h:mm:ss
    if (timer.active) {
      $('#timer-startButton').hide();
      $('#timer-stopButton').show();
    } else {
      $('#timer-startButton').show();
      $('#timer-stopButton').hide();
    }
  });
  
  chrome.runtime.sendMessage({type: 'getProductivityStatus'}, function(state) {
    $('#protime').text(state.productive);  // TODO: format as h:mm:ss
    $('#unprotime').text(state.unproductive);  // TODO: format as h:mm:ss
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'tick-master') {
    $('#timer-value').text(request.value);  // TODO: format as h:mm:ss
  } else if (request.type === 'tick-site') {
    
  } else if (request.type === 'tick-productive') {
    $('#protime').text(request.value);  // TODO: format as h:mm:ss
  } else if (request.type === 'tick-unproductive') {
    $('#unprotime').text(request.value);  // TODO: format as h:mm:ss
  }
});