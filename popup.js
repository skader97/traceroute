// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let testButton = document.getElementById('testButton');

testButton.onclick = function(element) {
  alert("TEST");
  chrome.tabs.getSelected(null, 
      function(tab) { 
        var tabURL = tab.url;
        alert(tabURL);
        var pingURL = "http://ip-api.com/#" + tabURL;
        var req = new XMLHttpRequest();
      	req.open("GET", pingURL, true);
      	req.onreadystatechange = function() {
          if (req.readyState == 4) {
            if (req.status == 200) {
              alert(req.responseText);
              document.write("OK");
            }
          }
        };
      req.send();
      });
};

