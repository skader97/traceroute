// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.tabs.getSelected(null, function(tab) { 
  var tabURL = tab.url;
  var pingURL = "http://ip-api.com/json/#" + tabURL;
  var req = new XMLHttpRequest();
  req.open("GET", pingURL, true);
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
        var obj = JSON.parse(req.responseText); 
        document.write("<h2>This website IP address is located in " + obj.country + "</h2>");
      }
    }
  };
  req.send();
});

