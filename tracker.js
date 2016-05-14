Tracker = function() {
  var self = this;
  
  self.currentPage;
  self.timer = new Timer('site');
  self.siteTimes = {};
  
  chrome.tabs.onActivated.addListener(function(activeInfo) {
    self.focusChange();
  })

  chrome.windows.onFocusChanged.addListener(function(windowId) {
    self.focusChange(windowId === chrome.windows.WINDOW_ID_NONE);
  })

  chrome.webNavigation.onCommitted.addListener(function(details) {
    self.pageChange(details.url);
  })
}

Tracker.prototype.focusChange = function(outOfChrome) {
  var self = this;

  if (outOfChrome === true) {
    self.siteChange('Other Application');
  } else {
    chrome.windows.getLastFocused(function(window) {
      chrome.tabs.query({
        active: true,
        windowId: window.id
      }, function(tabs) {
        var uri = URI(tabs[0].url);
        var domain = uri.hostname();
        if (domain !== self.currentSite) {
          self.siteChange(domain);
        }
      })
    })
  }
}

Tracker.prototype.siteChange = function(newSite) {
  var self = this;
  
  self.currentSite = newSite;
  
  if (typeof self.siteTimes === 'number') {
    self.siteTimes[self.currentSite] = self.siteTimes[self.currentSite] + self.timer.getState().value;
  } else {
    self.siteTimes[self.currentSite] = self.timer.getState().value;
  }
  
  if (self.timer.getState.active) {
    self.timer.reset();
  }
  self.timer.start();
  
  console.log(newSite)
}

Tracker.prototype.getState = function() {
  var self = this;
  
  return {
    site: self.currentSite,
    time: self.timer.getState().value
  }
}