
var app = {};

app.lat = 57.0;
app.lng = 13.5;
app.zoom = 5;

app.roadConditionsOverview = [];
app.roadConditions = [];
app.roadLines = [];

//Initialize map
app.initMap = function () {
    var mapOption = {
        center: { lat: app.lat, lng: app.lng },
        zoom: 8,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    app.map = new google.maps.Map(document.getElementById('map'), mapOption);
    app.trafficLayer = new google.maps.TrafficLayer();
    app.getRoadConditionsOverview();
    app.getRoadConditions();
    console.log("app.initMap");
}

app.getRoadConditionsOverview = function () {
    $.ajax({
        type: "GET",
        url: "https://localhost:44300/api/message/getroadconditionsoverview",
        success: function (data) {
            console.log("Susscessful fetch of data (GetRoadConditionsOverview)!");
            //Add data to array
            for (var i = 0; i < data.length; i++) {
                app.addObjToArray(data, app.roadConditionsOverview);
            }
            //Render markers
            app.setMarkers(app.roadConditionsOverview);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error while fetching data");
        },
        dataType: "json"
    });
}

app.getRoadConditions = function () {
    $.ajax({
        type: "GET",
        url: "https://localhost:44300/api/message/getroadconditions",
        success: function (data) {
            console.log("Susscessful fetch of data (GetRoadConditions)!");
            //Add data to array
            for (var i = 0; i < data.length; i++) {
                app.addObjToArray(data, app.roadConditions);
            }

            //Render road lines
            app.addLine(app.roadConditions);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error while fetching data");
        },
        dataType: "json"
    });
}

//Add json objects to array
app.addObjToArray = function (jsonData, array) {
    jsonData.forEach(function (item) {
        array.push(item);
    });
}

//Markers
app.setMarkers = function (arrayWithObjects) {
    console.log("setMarkers");
    var marker;
    var infowindow = new google.maps.InfoWindow;
    

    for (var i = 0; i < arrayWithObjects.length; i++) {

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(arrayWithObjects[i].Lat, arrayWithObjects[i].Lng),
            map: app.map
        });

        //Event Listener for markers
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent("<h3>" + arrayWithObjects[i].Text + "</h3>");
                infowindow.open(app.map, marker);
            }
        })(marker, i));
    }
}

//Road Lines
app.addLine = function (arrayWithObjects) {
    var infowindow = new google.maps.InfoWindow;

    app.roadLines = [];
    for (var i = 0; i < arrayWithObjects.length; i++) {
        if (arrayWithObjects[i].Cause != null) {
            var lineString = app.formatLineString(arrayWithObjects[i].WGS84);
            var line = new google.maps.Polyline({
                strokeColor: '#ff0000',
                strokeOpacity: 1.0,
                strokeWeight: 7,
                clickable: true,
                visible: false,
                map: app.map,
                path: lineString
            });

            //Event Listener for lines
            google.maps.event.addListener(line, 'click', (function (line, i) {
                return function (e) {
                    infowindow.setContent("<h4>Orsak: " + arrayWithObjects[i].Cause + "</h4>" +
                        "<p>RoadNumber: " + arrayWithObjects[i].RoadNumber + "</p>" +
                        "<p>ConditionText: " + arrayWithObjects[i].ConditionText + "</p>" +
                        "<p>LocationText: " + arrayWithObjects[i].LocationText + "</p>" +
                        "<p>Measurement: " + arrayWithObjects[i].Measurement + "</p>");
                    infowindow.setPosition(e.latLng);
                    infowindow.open(app.map);
                }
            })(line, i));

            app.roadLines.push(line);
        }   
    }
}

//Toggle road overview 
$("#trafficOverview-toggle").on('click', function() {
    $(this).toggleClass("traffic-toggle-off traffic-toggle-on");
    $("#trafficOverview").fadeToggle();

});

//Toggle road conditions (lines)
$("#trafficConditions-toggle").on('click', function() {
    $(this).toggleClass("traffic-toggle-off traffic-toggle-on");
    for (var i = 0; i < app.roadLines.length; i++) {
        var visible = app.roadLines[i].getVisible();
        app.roadLines[i].setVisible(!visible);
    }
});

//Toggle road flow
$("#trafficFlow-toggle").on('click', function () {
    $(this).toggleClass("traffic-toggle-off traffic-toggle-on");
    if (app.trafficLayer.getMap() == null) {
        app.trafficLayer.setMap(app.map);
    } else {
        app.trafficLayer.setMap(null);
    } 
});


$("#toggle-menu").on('click', function() {
    $("#overview").slideToggle(1);
    $(this).toggleClass("glyphicon glyphicon-minus glyphicon glyphicon-plus");
});

//Formatting a string with coordinates to google.maps.LatLng
app.formatLineString = function (lineString) {

    var regex = /\(([^()]+)\)/g;
    var cleanData = regex.exec(lineString)[1];

    var pointsData = cleanData.split(",");

    var coordArray = [];

    var len = pointsData.length;
    for (var i = 0; i < len; i++) {
        var xy = pointsData[i].split(" ");

        if (xy[0] === "") {
            xy.splice(0, 1);
        }

        var pt = new google.maps.LatLng(xy[1], xy[0]);
        coordArray.push(pt);
    }

    return coordArray;
}





