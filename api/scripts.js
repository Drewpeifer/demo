$(document).ready(function(){

});

var getQuery = function(){

   if(search == ''){

    } else {

        $('#banner').html("<h2>Loading...</h2>");// when waiting

        // call NASA
        $.getJSON("https://api.nasa.gov/planetary/apod?date=" + uglyDate + "&api_key=" + key + "", function(json) {
            if (json != ""){// show APOD entry for selected date
                
            } else {// shouldn't ever happen

            }
        }).error(function() {// 400 BAD REQUEST case (broken date, before APOD started, etc)

        });
    }

    return false;

}

$('#search').click(getQuery);// bind
$('#term').keyup(function(event){// cover return keypress
    if(event.keyCode == 13){
        getQuery();
    }
});