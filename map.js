mapboxgl.accessToken = 'pk.eyJ1IjoibGFycy0tIiwiYSI6ImNqNnFydXJ2YTAxZHcyd3MxYWprM2QzcTcifQ.O0NNNRdgVnHzcN3HmXf_NQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
});
console.log('Hello browser');

function addMarker(lat, lon, descrip) {
  var a = [lon, lat];
  var marker = new mapboxgl.Marker()
  .setLngLat(a)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML('<p>' + descrip + '</p>'))
  .addTo(map);	
}