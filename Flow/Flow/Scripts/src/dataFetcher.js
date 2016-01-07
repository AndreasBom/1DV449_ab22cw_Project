
/************** Ajax start ***********************/

//Method to fetch data RoadConditionsOverview 
app.roadConditionsOverviewAsync = function() {
    //For testing. Gives the right url to data
    var urlToData = function () {
        if (document.location.hostname === "localhost") {
            return "https://localhost:44300/TrafficMessages/RoadConditionsOverview";
        }
        return "https://trafficflow.azurewebsites.net/TrafficMessages/RoadConditionsOverview";
    }
    //Overview
    $.ajax({
        type: "GET",
        url: urlToData(),
        success: function (data) {
            console.log("Susscessful fetch of data (GetRoadConditionsOverview)!");
            if (typeof (Storage) !== "undefined") {
                //Add to local storage
                localStorage.setItem("OverviewNewFetch", JSON.stringify(data));
                localStorage.setItem("OverviewOldFetch", localStorage.getItem("OverviewNewFetch"));
                //Compare new data with old data
                if (localStorage.getItem("OverviewOldFetch") != null &&
                    localStorage.getItem("OverviewNewFetch") != null) {
                    
                    //Compare new data with data in local storage
                    var newData = localStorage.getItem("OverviewNewFetch");
                    var oldData = localStorage.getItem("OverviewOldFetch");
                    var equal = newData.localeCompare(oldData);
                    console.log("Overview in local storage was same as new fetch. Resultcode:" + equal);
                    if (equal !== 0) {
                        console.log("Updating Overview from web");
                        app.getRoadConditionsOverview();
                    }
                }

            } else {
                console.log("Storage not existing");
            }
        },
        error: function () {
            console.log("Error while fetching Overview");
        },
        dataType: "json"
    });
};


//Method to fetch data RoadConditions
app.roadConditionsAsync = function() {
    //For Testing
    var urlToData = function () {
        if (document.location.hostname === "localhost") {
            return "https://localhost:44300/TrafficMessages/RoadConditions";
        }
        return "https://trafficflow.azurewebsites.net/TrafficMessages/RoadConditions";
    }

    $.ajax({
        type: "GET",
        url: urlToData(),
        success: function(data) {
            console.log("Susscessful fetch of data (GetRoadConditions)!");

            if (typeof (Storage) !== "undefined") {
                //Add to local storage
                localStorage.setItem("RoadConditionsNewFetch", JSON.stringify(data));
                localStorage.setItem("RoadConditionsOldFetch", localStorage.getItem("RoadConditionsNewFetch"));
                //Compare new data with old data
                if (localStorage.getItem("RoadConditionsOldFetch") != null &&
                    localStorage.getItem("RoadConditionsNewFetch") != null) {
                    
                    //Compare new data with data in local storage
                    var newData = localStorage.getItem("RoadConditionsNewFetch");
                    var oldData = localStorage.getItem("RoadConditionsOldFetch");
                    var equal = newData.localeCompare(oldData);
                    console.log("Roadconditions in local storage was same as new fetch. Resultcode:" + equal);
                    if (equal !== 0) {
                        console.log("Updating RoadConditions from web");
                        app.getRoadConditions();
                    }
                }

            } else {
                console.log("Storage not existing");
            }
        },
        error: function () {
            console.log("Error while fetching RoadConditions");
        },
        dataType: "json"
    });
}

var getMessageData = function () {
    app.roadConditionsOverviewAsync();
    app.roadConditionsAsync();
}();
/************** Ajax end ***********************/

