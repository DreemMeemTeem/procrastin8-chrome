Tracker = function() {
  var self = this;
  
  self.active = false;

  self.currentPage;
  self.siteTimer = new Timer('site');
  self.siteTimes = {};

  self.productiveTimer = new Timer('productive');
  self.unproductiveTimer = new Timer('unproductive');

  chrome.tabs.onActivated.addListener(function(activeInfo) {
    self.focusChange();
  })

  chrome.windows.onFocusChanged.addListener(function(windowId) {
    self.focusChange(windowId === chrome.windows.WINDOW_ID_NONE);
  })

  chrome.webNavigation.onCommitted.addListener(function(details) {
    self.focusChange(false, details.url);
  })
}

Tracker.prototype.focusChange = function(outOfChrome, site) {
  var self = this;

  if (self.active === true) {
    if (outOfChrome === true) {
      self.siteChange('(Other Application)');
    } else if (typeof site === 'string') {
      var uri = URI(site);
      var domain = uri.hostname();
      if (domain !== self.currentSite) {
        self.siteChange(domain);
      }
    } else {
      chrome.windows.getLastFocused(function(window) {
        chrome.tabs.query({
          active: true,
          windowId: window.id
        }, function(tabs) {
          var uri = URI(tabs[0].url);
          var domain = uri.hostname();
          if (domain !== self.currentSite && domain) {
            self.siteChange(domain);
          }
        })
      })
    }
  }
}

Tracker.prototype.siteChange = function(newSite) {
  var self = this;

  self.currentSite = newSite;

  if (typeof self.siteTimes === 'number') {
    self.siteTimes[self.currentSite] = self.siteTimes[self.currentSite] + self.siteTimer.getState().value;
  } else {
    self.siteTimes[self.currentSite] = self.siteTimer.getState().value;
  }

  if (self.siteTimer.getState.active) {
    self.siteTimer.reset();
  }
  self.siteTimer.start();

  if (Math.sign(gradeSite(newSite)) === 1) {
    self.productiveTimer.start();
    self.unproductiveTimer.stop();
  } else if (Math.sign(gradeSite(newSite)) === -1) {
    self.unproductiveTimer.start();
    self.productiveTimer.stop();
  }

  console.log(newSite + ': ' + gradeSite(newSite))
}

Tracker.prototype.getSiteState = function() {
  var self = this;

  return {
    site: self.currentSite,
    time: self.siteTimer.getState().value
  }
}

Tracker.prototype.getProductivityState = function() {
  var self = this;

  return {
    productive: self.productiveTimer.getState().value,
    unproductive: self.unproductiveTimer.getState().value
  }
}

Tracker.prototype.start = function() {
  var self = this;
  
  self.active = true;
}

Tracker.prototype.stop = function() {
  var self = this;
  
  self.active = false;
  
  self.productiveTimer.reset();
  self.unproductiveTimer.reset();
}
