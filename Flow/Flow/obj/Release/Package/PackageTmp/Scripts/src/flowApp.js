/************** Variables start***********************/

app.roadConditionsOverview = [];
app.roadConditions = [];
app.roadLines = [];


/************** Variables End***********************/

/************ INIT APP *****************************/
//Initialize map
app.initApp = function () {
    app.trafficLayer = new google.maps.TrafficLayer();
    app.getRoadConditionsOverview();
    app.getRoadConditions();
    console.log("app.initMap was successful");
};
/********************************************************


/************** functions start ***********************/
app.getRoadConditionsOverview = function () {
    var fetchedData = {};

    //If there is no data i local storage, data will be fetched from web
    if (localStorage.getItem("OverviewOldFetch") === null) {
        try {
            fetchedData = app.roadConditionsOverviewAsync();
            console.log("localStorage is empty. Fetching from web");
        } catch (err) {
            console.log(err);
        }
        //If there is data in local storage
    } else {
        fetchedData = localStorage.getItem("OverviewNewFetch");
        console.log("Fetching from local storage");
    }
    var data = JSON.parse(fetchedData);

    //Add data to array
    for (var i = 0; i < data.length; i++) {
        app.addObjToArray(data, app.roadConditionsOverview);
    }

    //Render overview window
    app.OverviewWindow(app.roadConditionsOverview);

    //Position map to chosen location
    map.setCenter(new google.maps.LatLng(app.roadConditionsOverview[0].Lat, app.roadConditionsOverview[0].Lng));
};

//RoadConditions
app.getRoadConditions = function () {
    //Inform user that data is loading
    $("#trafficConditions-toggle").html("Hämtar...");

    //For testing. Gives the right url to data

    var fetchedData = {};

    //If there is no data i local storage, data will be fetched from web
    if (localStorage.getItem("RoadConditionsOldFetch") === null) {
        try {
            fetchedData = app.roadConditionsAsync();
            console.log("localStorage is empty. Fetching from web (app.getRoadConditions)");
        } catch (err) {
            console.log(err);
            return;
        }
        //If there is data in local storage
    } else {
        fetchedData = localStorage.getItem("RoadConditionsNewFetch");
        console.log("Fetching from local storage");
    }

    var data = JSON.parse(fetchedData);

    //Add data to array
    for (var i = 0; i < data.length; i++) {
        app.addObjToArray(data, app.roadConditions);
    }

    //Data is loaded, show button text
    $("#trafficConditions-toggle").html("Trafikvarning");

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
    console.log("Number of warnings: " + app.roadLines.length);
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
        console.log("trafficConditions event was pressed");
    }


});

//Toggle road flow
$("#trafficFlow-toggle").on('click', function () {
    console.log("Toggle RoadFlow");
    $(this).toggleClass("traffic-toggle-off traffic-toggle-on");
    if (app.trafficLayer.getMap() == null) {
        app.trafficLayer.setMap(map);
        console.log("Getmap true");
    } else {
        app.trafficLayer.setMap(null);
        console.log("Getmap false");
    }
});

//$("#toggle-menu").on('click', function() {
//    $("#overview").slideToggle(1);
//    $(this).toggleClass("glyphicon glyphicon-minus glyphicon glyphicon-plus");
//});
/************** Events end ***********************/

/***************** Util ***********************/



//Add json objects to array
app.addObjToArray = function (jsonData, array) {
    jsonData.forEach(function (item) {
        array.push(item);
    });
}


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


