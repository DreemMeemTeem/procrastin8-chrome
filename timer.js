Timer = function() {
  var self = this;
  
  self.startTime = Date.now();
  self.value = 0;
}

Timer.prototype.tick = function(self) {
  self.value += 1;
  chrome.runtime.sendMessage({type: 'tick', value: self.value});
}

Timer.prototype.callTick = function(tickthis) {
  var self = this;
  
  return function() {
    self.tick(tickthis);
  }
}

Timer.prototype.getState = function() {
  var self = this;
  
  return {
    value: self.value,
    active: typeof self.interval === 'number'
  }
}

Timer.prototype.start = function() {
  var self = this;
  
  self.value = 0;
  self.interval = setInterval(self.callTick(self), 1000);
  return self.interval
}

Timer.prototype.stop = function() {
  var self = this;
  
  clearInterval(self.interval);
  self.interval = undefined;
}

Timer.prototype.resume = function() {
  var self = this;
  
  self.interval = setInterval(self.tick, 1000);
  return self.interval
}