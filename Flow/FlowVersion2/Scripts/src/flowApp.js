/************** Variables start***********************/

app.roadConditionsOverview = [];
app.roadConditions = [];
app.roadLines = [];


/************** Variables End***********************/

/************ INIT APP *****************************/
//Initialize map
app.initApp = function () {
    console.log("app.initMap was successful");
};
/********************************************************


/************** functions start ***********************/
app.getRoadConditionsOverview = function () {
    var data = JSON.parse(localStorage.getItem("Overview"));
    //Add data to array
    for (var i = 0; i < data.length; i++) {
        app.addObjToArray(data, app.roadConditionsOverview);
    }

    //Render overview window
    app.OverviewWindow(app.roadConditionsOverview);

    //INGEN ANING OM VARFÖR PUNKTEN I DECIMALTALEN LAT och LNG FÖRSVINNER NÄR DEN LANDAR PÅ KLIENTEN
    // (lokalt funkar det men inte på remote server. ex 14.23344 blir 1423344). Så nedan följer en nödlösning.
    var lat = app.roadConditionsOverview[0].Lat;
    var lng = app.roadConditionsOverview[0].Lng;
    var digits;
    var divider;
    if (lat % 1 === 0) {
        digits = (lat.toString().length) - 2;
        divider = Math.pow(10, parseInt(digits));
        lat = lat / divider;
    }
    if (lng % 1 === 0) {
        digits = (lng.toString().length) - 2;
        divider = Math.pow(10, parseInt(digits));
        lng = lng / divider;
    }
    
    //Position map to choosen location
    map.setCenter(new google.maps.LatLng(lat, lng));

};

//RoadConditions
app.getRoadConditions = function () {
    var data = JSON.parse(localStorage.getItem("RoadConditions"));

    //Add data to array
    for (var i = 0; i < data.length; i++) {

        app.addObjToArray(data, app.roadConditions);
    }

    //Render road lines
    app.addLine(app.roadConditions);

};
/************** functions end ***********************/

/************** Layers and Views start ***********************/

//Overview window
app.OverviewWindow = function (arrayWithObjects) {
    

    $("#trafficOverview-title").html("<h5>" + arrayWithObjects[0].LocationText + "</h5>");
    $("#trafficOverview-body").html("<p>" + arrayWithObjects[0].Text + "</p>");
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
                map: map,
                path: lineString
            });

            //Event Listener for lines
            google.maps.event.addListener(line, 'click', (function (line, i) {
                return function (e) {
                    var measurement;
                    if (arrayWithObjects[i].Measurement != null) {
                        measurement = "<p>Åtgärd: " + arrayWithObjects[i].Measurement + "</p>";
                    } else {
                        measurement = "";
                    }

                    infowindow.setContent("<h4>Trafikvarning</h4>" +
                        "<p>Orsak: " + arrayWithObjects[i].Cause + "</p>" +
                        "<p>Vägnummer: " + arrayWithObjects[i].RoadNumber + "</p>" +
                        "<p>Plats: " + arrayWithObjects[i].LocationText + "</p>" +
                        "<p>Allvarlighetsgrad: " + arrayWithObjects[i].ConditionText + "</p>" +
                        measurement
                    );
                    infowindow.setPosition(e.latLng);
                    infowindow.open(map);
                }
            })(line, i));

            app.roadLines.push(line);
        }
    }
};
/************** Layers and Views end ***********************/

/************** Events start ***********************/
//Toggle road overview 
$("#trafficOverview-toggle").on('click', function () {
        $(this).toggleClass("traffic-toggle-off traffic-toggle-on");
        $("#trafficOverview").fadeToggle();
});

//Toggle road conditions (lines)
$("#trafficConditions-toggle").on('click', function () {
        $(this).toggleClass("traffic-toggle-off traffic-toggle-on");
        for (var i = 0; i < app.roadLines.length; i++) {
            var visible = app.roadLines[i].getVisible();
            app.roadLines[i].setVisible(!visible);
        }
});

//Toggle road flow
$("#trafficFlow-toggle").on('mousedown', function() {
    Offline.check();
});
$("#trafficFlow-toggle").on('click', function () {
    
    if (Offline.state !== "down") {
        $(this).toggleClass("traffic-toggle-off traffic-toggle-on");
        if (app.trafficLayer.getMap() == null) {
            app.trafficLayer.setMap(map);

        } else {
            app.trafficLayer.setMap(null);
        }
    }
});

/************** Events end ***********************/

/***************** Util ***********************/

//Add json objects to array
app.addObjToArray = function (jsonData, array) {
    jsonData.forEach(function (item) {
        array.push(item);
    });
}


//Formatting a string with coordinates to google.maps.LatLng
//Original format == LINESTRING(12.345 56.2345, 11.2345 56.6543 ......)
//Output == Array with [google.maps.latlng]
app.formatLineString = function (lineString) {
    //Remove all but decimal numbers
    var regex = /\(([^()]+)\)/g;
    var cleanData = regex.exec(lineString)[1];
    
    //put each road in a seperate location in an array
    var pointsData = cleanData.split(",");
    var coordArray = [];

    //for each road, split all the lat lng points into a location in an array
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




