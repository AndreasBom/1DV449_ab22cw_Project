﻿var lat = 62.0;
var lng = 13.5;
var zoom = 5;
var app = {};
app.initMap = function() {

    var mapOption = {
        center: { lat: lat, lng: lng },
        zoom: 8,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    app.trafficLayer = new google.maps.TrafficLayer();
    window.map = new google.maps.Map(document.getElementById('map'), mapOption);

    //$(app.initApp()); //(::flowApp.js)

}

