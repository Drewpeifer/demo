$(document).ready(function(){
    $('#term').datepicker({ dateFormat: 'mm-dd-yy', maxDate: "+0d" });
});

var getQuery = function(){

  var date = $('#term').val(),// value in the datepicker
      dateArray = date.split('-'),
      uglyDate = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1],// what the api wants
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      month = dateArray[0] - 1,
      prettyDate = months[month] + ' ' + dateArray[1] + ', ' + dateArray[2],// e.g. Jan 01, 2017
      key = 'up0wVqmYq3dlP8SAGdRVWljjiELKm44P38DRGuNC',// public dev API key
      credits = '<p>Images and text courtesy of ' +
                '<a  target="_blank" href="https://apod.nasa.gov/apod/astropix.html">' +
                'NASA</a></p>';

   if(date == ''){// searching without a date

        $('#banner').html("<h2 class='alert'>Psst!</h2>");
        $('#photo').html('<img src="img/neil.jpg" />');
        $('#title').html('<h3 class="alert">You forgot to enter a date.</h3>');
        $('#description').html('');
        $('#footer').html('');

    } else {

        $('#banner').html("<h2>Loading...</h2>");// when waiting

        // call NASA
        $.getJSON("https://api.nasa.gov/planetary/apod?date=" + uglyDate + "&api_key=" + key + "", function(json) {
            if (json != ""){// show APOD entry for selected date
                $('#banner').html('<h2>' + prettyDate + '</h2>');
                $('#photo').html('<img src=' + json.hdurl + ' />');
                $('#title').html('<h3>' + json.title + '</h3>');
                $('#description').html('<p>' + json.explanation + '</p>');
                $('#footer').html(credits);
            } else {// shouldn't ever happen
                $('#banner').html('<h2 class="alert">Aww, shucks.</h2>');
                $('#title').html('<h3 class="alert">This is embarassing.</h3>');
                $('#photo').html('<img src="img/carl.gif" />');
                $('#description').html('<p class="alert">NASA had a problem with that photo, please search a different date.');
                $('#footer').html('');
            }
        }).error(function() {// 400 BAD REQUEST case (broken date, before APOD started, etc)
            $('#banner').html('<h2 class="alert">Aww, shucks.</h2>');
            $('#title').html('<h3 class="alert">This is embarassing.</h3>');
            $('#photo').html('<img src="img/carl.gif" />');
            $('#description').html('<p class="alert">NASA had a problem with that photo, please search a different date.');
            $('#footer').html('');
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