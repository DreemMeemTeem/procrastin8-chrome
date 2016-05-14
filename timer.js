Timer = function(type, site) {
  var self = this;
  
  self.timertype = type || 'master';
  self.timersite = site;
  
  self.startTime = Date.now();
  self.value = 0;
}

Timer.prototype.tick = function(self) {
  self.value += 1;
  chrome.runtime.sendMessage({
    type: 'tick-' + self.timertype,
    value: self.value,
    site: self.timersite
  });
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

  self.interval = setInterval(self.callTick(self), 1000);
  return self.interval
}

Timer.prototype.stop = function() {
  var self = this;

  clearInterval(self.interval);
  self.interval = undefined;
}

Timer.prototype.reset = function() {
  var self = this;

  self.stop();
  self.value = 0;
  return self.interval
}
