'use strict';

module.exports = function () {
  var mapOptions = {
    // Zoom
    zoom: 13,
    // Middle coordinate
    center: new google.maps.LatLng(49.8382, 24.02324), // Lviv
    // Stile map
    styles: [{"featureType": "administrative", "stylers": [{"visibility": "off"}]}, {
      "featureType": "poi",
      "stylers": [{"visibility": "simplified"}]
    }, {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{"visibility": "simplified"}]
    }, {"featureType": "water", "stylers": [{"visibility": "simplified"}]}, {
      "featureType": "transit",
      "stylers": [{"visibility": "simplified"}]
    }, {"featureType": "landscape", "stylers": [{"visibility": "simplified"}]}, {
      "featureType": "road.highway",
      "stylers": [{"visibility": "off"}]
    }, {"featureType": "road.local", "stylers": [{"visibility": "on"}]}, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{"visibility": "on"}]
    }, {"featureType": "water", "stylers": [{"color": "#abbaa4"}]}, {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [{"color": "#f6f9fc"}]
    }, {"featureType": "road.highway", "stylers": [{"color": "#ad9b8d"}]}],
    // Switch off standart interface
    disableDefaultUI: true,
    // Disabling mouse wheel scrolling
    scrollwheel: false
  };

  // Select an item for the map
  var mapElement = document.getElementById('js-map');
  // Create the map
  var map = new google.maps.Map(mapElement, mapOptions);
};
