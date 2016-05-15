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
    $('#timer-value').text(hms(timer.value));  // TODO: format as h:mm:ss
    if (timer.active) {
      $('#timer-startButton').hide();
      $('#timer-stopButton').show();
    } else {
      $('#timer-startButton').show();
      $('#timer-stopButton').hide();
    }
  });
  
  chrome.runtime.sendMessage({type: 'getProductivityStatus'}, function(state) {
    $('#protime').text(hms(state.productive.time));  // TODO: format as h:mm:ss
    $('#unprotime').text(hms(state.unproductive.time));  // TODO: format as h:mm:ss
    
    $('#propoints').text(state.productive.score);
    $('#unpropoints').text(state.unproductive.score);
    
    $('#totalpoints h1').text(state.productive.score - state.unproductive.score);
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  forceSetTimerValue();
  if (request.type === 'tick-master') {
    $('#timer-value').text(hms(request.value));  // TODO: format as h:mm:ss
  } else if (request.type === 'tick-site') {
    
  } else if (request.type === 'tick-productive') {
    $('#protime').text(hms(request.value));  // TODO: format as h:mm:ss
  } else if (request.type === 'tick-unproductive') {
    $('#unprotime').text(hms(request.value));  // TODO: format as h:mm:ss
  }

});

function hms(secs) {
  return moment().startOf('day').seconds(secs).format('H:mm:ss');
}