'use strict';
const apiKey = 'a4e2bf0c8ffe58c1a96b98b54d9bfab4'
chrome.tabs.getSelected(null, function(tab) {
  var domain = getHostName(tab.url);
  
  // get request to API 
  // get_request(domain); 
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
        console.log(obj); 
        var country = obj.country_name;
        var region = obj.region_name; 
        var lat = obj.latitude;
        var lon = obj.longitude; 
        if (country !== null) {
          if (region) {
            let div = document.createElement('div');
            div.innerHTML = "<h4>IP: " + domain + " location: " + region + ", " + country + "</h4>";
            document.body.appendChild(div);
            var map = document.getElementById("map");
            map.insertBefore(div, map.childNodes[0]);
          } else {
            let div = document.createElement('div');
            div.innerHTML = "<h4>IP: " + domain + " location: " + country + "</h4>";
            document.body.appendChild(div);
            var map = document.getElementById("map");
            map.insertBefore(div, map.childNodes[0]);
          }
        } 
      }
    }
  };
  req.send();
}