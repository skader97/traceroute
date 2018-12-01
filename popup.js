// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const apiKey = 'a4e2bf0c8ffe58c1a96b98b54d9bfab4'
alert(imgs.length); 
chrome.tabs.getSelected(null, 
function(tab) { 
  var domain = getHostName(tab.url);
  
  var pingURL = "http://api.ipapi.com/api/" + domain + '?access_key=' + apiKey;
  // get request to API 
  var req = new XMLHttpRequest();
  req.open("GET", pingURL, true);
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
        var obj = JSON.parse(req.responseText); 
        var country = obj.country_name;
        var region = obj.region_name; 
        if (region) {
          document.write("<h2>This website IP address is located in " + region + ", " + country + "</h2>");
        } else {
          document.write("<h2>This website IP address is located in " + country + "</h2>");
        }
      }
    }
  };
  req.send();
});

function getHostName(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  } else {
      return null;
  }
}