$(document).ready(function(){

  $('#term').datepicker({ dateFormat: 'mm-dd-yy', maxDate: "+0d" });

   });

   var getQuery = function(){

        var date = $('#term').val(),
            dateArray = date.split('-'),
            uglyDate = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1],
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            month = dateArray[0] - 1,
            prettyDate = months[month] + ' ' + dateArray[1] + ', ' + dateArray[2],
            key = 'up0wVqmYq3dlP8SAGdRVWljjiELKm44P38DRGuNC',
            todaysUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + key,
            credits = '<p>Images and text courtesy of ' +
                      '<a  target="_blank" href="https://apod.nasa.gov/apod/astropix.html">' +
                      'NASA</a></p>';

         if(date == ''){

            $('#title').html("<h2 class='alert'>Psst!</h2>");
            $('#photo').html('<img src="img/neil.jpg" />');
            $('#description').html('<p class="alert">You forgot to enter a date.</p>');
            $('#footer').html('');

         } else {

            $('#title').html("<h2>Loading...</h2>");

            $.getJSON("https://api.nasa.gov/planetary/apod?date=" + uglyDate + "&api_key=" + key + "", function(json) {
               if (json != ""){
                     $('#title').html('<h2>' + prettyDate + '</h2>');
                     $('#photo').html('<img src=' + json.hdurl + ' />');
                     $('#description').html('<p>' + json.explanation + '</p>');
                     $('#footer').html(credits);
                  } else {
                    $('#title').html('<h2>Nothing found</h2>');
                  }
             }).error(function() {
              $('#title').html('<h2 class="alert">Aww, shucks.</h2>');
              $('#photo').html('<img src="img/carl.gif" />');
              $('#description').html('<p class="alert">NASA had a problem with that photo, please search a different date.');
              $('#footer').html('');
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