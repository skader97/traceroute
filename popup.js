// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let ipButton = document.getElementById('IPbutton');
const apiKey = 'a4e2bf0c8ffe58c1a96b98b54d9bfab4'
// ipButton.onclick = function(element) {
  chrome.tabs.getSelected(null, 
      function(tab) { 
        var tabURL = tab.url;
        // strip url to just the domain name
        var match = tabURL.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
          tabURL= match[2];
        } else {
          tabURL = null;
        }
        var pingURL = "http://api.ipapi.com/api/" + tabURL + '?access_key=' + apiKey;
        // get request to API 
        var req = new XMLHttpRequest();
        req.open("GET", pingURL, true);
        req.onreadystatechange = function() {
          if (req.readyState == 4) {
            if (req.status == 200) {
              var obj = JSON.parse(req.responseText); 
              document.write("<h2>This website IP address is located in " + obj.country_name + "</h2>");
            }
          }
        };
      req.send();
        /* Connects to the socket server */
var socket = io.connect('http://localhost:3002');
socket.on('connect', function() {
  console.log('Client connected');
  socket.emit('sendURL',tabURL);
});
socket.on('trace', function(msg){
  console.log(msg);
});
      });



