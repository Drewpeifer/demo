$(document).ready(function(){

  $('#term').datepicker({ dateFormat: 'mm-dd-yy', maxDate: "+0d" });

   });

   var getQuery = function(){

        var date = $('#term').val(),
            dateArray = date.split('-');
            uglyDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
            key = 'up0wVqmYq3dlP8SAGdRVWljjiELKm44P38DRGuNC',
            todaysUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + key;

         if(date == ''){

            $('#title').html("<h2>No date entered!</h2>");

         } else {

            $('#title').html("<h2>Loading...</h2>");

            $.getJSON("https://api.nasa.gov/planetary/apod?date=" + uglyDate + "&api_key=" + key + "", function(json) {
               if (json != ""){
                     $('#title').html('<h2>Astronomy Photo of the Day for: ' + date + '</h2>');
                     $('#photo').html('<img src=' + json.hdurl + ' />');
                     $('#description').html('<p>' + json.explanation + '</p>');
                     $('#result').append('<div id="footer"><p>Images and text courtesy of ' +
                                         '<a  target="_blank" href="https://apod.nasa.gov/apod/astropix.html">' +
                                         'NASA</a></p></div>');
                  } else {
                    $('#title').html('<h2>Nothing found</h2>');
                  }
             });

          }

        return false;
   }

   $('#search').click(getQuery);
   $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getQuery();
       }
   });