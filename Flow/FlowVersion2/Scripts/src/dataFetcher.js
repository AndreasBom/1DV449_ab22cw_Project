
/************** Ajax start ***********************/

//Method to fetch data RoadConditionsOverview 
app.roadConditionsOverviewAsync = function () {
    //For testing. Gives the right url to data
    //var urlToData = function () {
    //    if (document.location.hostname === "localhost") {
    //        return "http://localhost:48120/TrafficMessages/RoadConditionsOverview";
    //    }
    //    return "http://flowtraffic.azurewebsites.net/TrafficMessages/RoadConditionsOverview";
    //}
    
    var urlToData = function () {
        if (document.location.href.indexOf("ab22cw/") > -1) {
            return "TrafficMessages/RoadConditionsOverview";
        }
        return "ab22cw/TrafficMessages/RoadConditionsOverview";
    }

    //Ajax reques to fetch 'road conditions overview'
    $.ajax({
        type: "GET",
        url: urlToData(),
        dataType: "json"
    }).done(function (data) {
        console.log("Successful fetch of data (GetRoadConditionsOverview)!");
        var notUpdatedLS = saveToLS("Overview", data);
        app.getRoadConditionsOverview();
    }).fail(function () {
        try {
            app.errorMessage("Det gick inte att hämta data från servern. Sparad data hämtas");
            app.getRoadConditionsOverview();

        } catch (e) {
            app.errorMessage("Det gick inte att hämta data");
        }
    });

};


//Method to fetch data RoadConditions
app.roadConditionsAsync = function () {
    //For Testing
    //var urlToData = function () {
    //    if (document.location.hostname === "localhost") {
    //        return "http://localhost:48120/TrafficMessages/RoadConditions";
    //    }
    //    return "http://flowtraffic.azurewebsites.net/TrafficMessages/RoadConditions";
    //}

    var urlToData = function () {
        if (document.location.href.indexOf("ab22cw/") > -1) {
            return "TrafficMessages/RoadConditions";
        }
        return "ab22cw/TrafficMessages/RoadConditions";
    }

    //Inform user that data is loading
    $("#trafficConditions-toggle").html("Hämtar...");

    $.ajax({
        type: "GET",
        url: urlToData(),
        dataType: "json"
    }).done(function(data) {
        console.log("Successful fetch of data (GetRoadConditions)!");
        console.log(document.location.href);
        var notUpdatedLS = saveToLS("RoadConditions", data);
        app.getRoadConditions();
        //Data is loaded, show button text
        $("#trafficConditions-toggle").html("Trafikvarning");
    }).fail(function() {
        console.log(document.location.href);
        try {
            app.errorMessage("Det gick inte att hämta data från servern. Sparad data hämtas");
            app.getRoadConditions();

        } catch (e) {
            app.errorMessage("Det gick inte att hämta data");
        }
    });
};


//Go fetch data 
var getMessageData = function () {
    app.roadConditionsOverviewAsync();
    app.roadConditionsAsync();
}();
/************** Ajax end *********************/


/************** Util *********************/

//Put timestamp in 


//Saves to localStorage and returns true if data in UI needs to be updated (id data in LS is not up-to-date)
var saveToLS = function (name, data) {
    var equal;
    var datetimeObj = new Date();

    //valid in LS for 10 minutes
    var validTime = datetimeObj.setTime(Date.now() + (10 * 60 * 1000));
    data.valid = validTime;
    

    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem(name) === null) {
            localStorage.setItem(name, JSON.stringify(data));
            return false;
        } else {
            //Compare new data with data in local storage
            var newData = JSON.stringify(data);
            var oldData = localStorage.getItem(name);
            equal = newData.localeCompare(oldData);
            console.log("Resultcode: " + equal);
            //If old and new data is different or if validtime has past
            if (equal !== 0 || oldData.valid < Date.now()) {
                localStorage.setItem(name, JSON.stringify(data));
            }
            return equal === 0;
        }
    }

    //No Local Storage
    return null;
}


/************* Error message ****************/

app.errorMessage = function (message) {
    $("#errorMessage").html("<h4>" + message + "</h4>")
        .hide()
        .fadeIn('fast')
        .delay(2000)
        .fadeOut(500);
};
