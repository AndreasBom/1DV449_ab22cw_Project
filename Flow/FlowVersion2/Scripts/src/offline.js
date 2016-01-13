$(document).ready(function() {

    $("#adminBtn").on('mouseover', function() {
        Offline.check();
    });
    $("#adminBtn").on('mousedown', function () {
        if (Offline.state === "down") {
            $("#adminBtn").bind('click', function(e) {
                console.log(Offline.state);
                e.preventDefault();
            });
        } else {
            $("#adminBtn").unbind('click');
        }
    });


    $("#map").on('mousedown', function () {
        Offline.check();
    });

    $("#map").on('click', function () {
        if (Offline.state === "down") {
            map.setOptions({ draggable: false });
        }
        map.setOptions({ draggable: true });
    });
    
});