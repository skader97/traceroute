'use strict';

let testButton = document.getElementById('testButton');

testButton.onclick = function(element) {
  chrome.tabs.getSelected(null, 
      function(tab) { 
        var tabURL = tab.url;
        var pingURL = "http://ip-api.com/json/#" + tabURL;
        var req = new XMLHttpRequest();
      	req.open("GET", pingURL, true);
      	req.onreadystatechange = function() {
          if (req.readyState == 4) {
            if (req.status == 200) {
              var obj = JSON.parse(req.responseText); 
              alert(obj.city + ", " + obj.region + ", " + obj.country);
              document.write("OK");
            }
          }
        };
      req.send();
      });
};

