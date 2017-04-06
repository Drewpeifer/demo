$(document).ready(function(){

  

   });

   var getQuery = function(){

        var date = $('#term').val(),
            key = 'up0wVqmYq3dlP8SAGdRVWljjiELKm44P38DRGuNC',
            todaysUrl = 'https://api.nasa.gov/planetary/apod?api_key=up0wVqmYq3dlP8SAGdRVWljjiELKm44P38DRGuNC';

         if(date == ''){

            $('#message').html("<h2 class='loading'>No date entered!</h2>");

         } else {

            $('#message').html("<h2 class='loading'>Loading...</h2>");

            $.getJSON("https://api.nasa.gov/planetary/apod?date=" + term + "&api_key=up0wVqmYq3dlP8SAGdRVWljjiELKm44P38DRGuNC", function(json) {
               if (json != "Nothing found."){
                     $('#message').html('<h2 class="loading">Photo found!</h2><img id="thePoster" src=' + json[0].url + ' />');
                  } else {
                     $.getJSON(todaysUrl, function(json) {
                        console.log(json);
                        $('#message').html('<h2 class="loading">We\'re afraid nothing was found for that search. Here\'s the picture for today instead!</h2><img id="thePoster" src=' + json[0].posters[0].image.url + ' />');
                     });
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