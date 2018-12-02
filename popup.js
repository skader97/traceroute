'use strict';

const apiKey = 'a4e2bf0c8ffe58c1a96b98b54d9bfab4'
chrome.tabs.getSelected(null, function(tab) { 
  var domain = getHostName(tab.url);
  
  // get request to API 
  get_request(domain); 
  /* Connects to the socket server */
  var socket = io.connect('http://localhost:3002');
  socket.on('connect', function() {
    console.log('Client connected');
    socket.emit('sendURL',domain);
  });
  socket.on('trace', function(msg){
  msg = msg.replace(/['"]+/g, '');   
  get_request(msg);
  });
});

/* Connects to the socket server */
var socket = io.connect('http://localhost:3002');
socket.on('connect', function() {
  console.log('Client connected');
});
// socket.on('chat message', function(msg){
//   console.log('got messgae: ', msg);
// });

function getHostName(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  } else {
      return null;
  }
}

function get_request(domain) {
  var pingURL = "http://api.ipapi.com/api/" + domain + '?access_key=' + apiKey;
  var req = new XMLHttpRequest();
  req.open("GET", pingURL, true);
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
        var obj = JSON.parse(req.responseText); 
        var country = obj.country_name;
        var region = obj.region_name; 
        if (country !== null) {
          if (region) {
            document.write("<h2>IP: " + domain + " location: " + region + ", " + country + "</h2>");
          } else {
            document.write("<h2>IP: " + domain + " location: " + country + "</h2>");
          }
        } 
      }
    }
  };
  req.send();
}