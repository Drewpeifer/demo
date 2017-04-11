$(document).ready(function(){
    $( "fieldset input[type=checkbox]" ).checkboxradio({
        icon: false// hides checkbox inside label
    });
});

// API Request

sampleJSON = {
    title: "Recipe Puppy",
    version: 0.1,
    href: "http://www.recipepuppy.com/",
    results: [
        {
            title: "Vegetable-Pasta Oven Omelet",
            href: "http://find.myrecipes.com/recipes/recipefinder.dyn?action=displayRecipe&recipe_id=520763",
            ingredients: "tomato, onions, red pepper, garlic, olive oil, zucchini, cream cheese, vermicelli, eggs, parmesan cheese, milk, italian seasoning, salt, black pepper",
            thumbnail: "http://img.recipepuppy.com/560556.jpg"
        },
        {
            title: "Roasted Pepper and Bacon Omelet",
            href: "http://www.bigoven.com/43919-Roasted-Pepper-and-Bacon-Omelet-recipe.html",
            ingredients: "eggs, salt, black pepper, butter, black pepper, bacon, onions, garlic, roasted red peppers, oregano, black pepper",
            thumbnail: ""
        },
        {
            title: "Vegetable-Pasta Oven Omelet",
            href: "http://find.myrecipes.com/recipes/recipefinder.dyn?action=displayRecipe&recipe_id=520763",
            ingredients: "tomato, onions, red pepper, garlic, olive oil, zucchini, cream cheese, vermicelli, eggs, parmesan cheese, milk, italian seasoning, salt, black pepper",
            thumbnail: "http://img.recipepuppy.com/560556.jpg"
        },
        {
            title: "Roasted Pepper and Bacon Omelet",
            href: "http://www.bigoven.com/43919-Roasted-Pepper-and-Bacon-Omelet-recipe.html",
            ingredients: "eggs, salt, black pepper, butter, black pepper, bacon, onions, garlic, roasted red peppers, oregano, black pepper",
            thumbnail: ""
        },
        {
            title: "Vegetable-Pasta Oven Omelet",
            href: "http://find.myrecipes.com/recipes/recipefinder.dyn?action=displayRecipe&recipe_id=520763",
            ingredients: "tomato, onions, red pepper, garlic, olive oil, zucchini, cream cheese, vermicelli, eggs, parmesan cheese, milk, italian seasoning, salt, black pepper",
            thumbnail: "http://img.recipepuppy.com/560556.jpg"
        },
        {
            title: "Roasted Pepper and Bacon Omelet",
            href: "http://www.bigoven.com/43919-Roasted-Pepper-and-Bacon-Omelet-recipe.html",
            ingredients: "eggs, salt, black pepper, butter, black pepper, bacon, onions, garlic, roasted red peppers, oregano, black pepper",
            thumbnail: ""
        }
    ]};

    data = sampleJSON.results; 

var getQuery = function(){

    var term = $('#term').val().split(' ').join(''),// sanitize text input value
        tags = $.map($('fieldset input[type=checkbox]:checked'), function(n, i){
                    return n.name;
                }).join(','),// create concatenated list of radiocheckboxes
        baseUrl = "http://www.recipepuppy.com/api/",// base API url
        statusMessage = $('div.status'),
        results = $('.results'),
        search = $('#search');// search button

    if ($('fieldset input[type=checkbox]:checked').length == 0) {// if there's no tags selected
        query = term;
        console.log('no tags!');
        console.log('term is ' + term);
        console.log('tags are ' + tags);
        console.log('query is ' + query);
    } else if (term == "") {
        query = tags;
        console.log('no term!');
        console.log('term is ' + term);
        console.log('tags are ' + tags);
        console.log('query is ' + query);
    } else {
        query = term + ',' + tags,// concatenate term and tags
        console.log('term is ' + term);
        console.log('tags are ' + tags);
        console.log('query is ' + query);
    }

    requestUrl = baseUrl + '?i=' + query + '&p=5?callback=?';

    console.log('API request made to ' + requestUrl);

   if (query == '') {
        // nothing typed or selected, do nothing
    } else {

        statusMessage.html("<h2>Loading...</h2>");// when waiting

        // call RecipePuppy
        $.getJSON(requestUrl, function(json) {

            results.html('');

            if (json != ""){// show recipe results
                statusMessage.html("<h2>Recipe(s) found!</h2>");

                $.each(json.results, function(i) {

                    if (this.thumbnail == "") {
                        imageUrl = 'img/no-image.png';
                    } else {
                        imageUrl = this.thumbnail;
                    }

                    recipeBlurb = '<div class="recipe">' +
                                    '<div class="thumb">' +
                                        '<a href="' + this.href + '"><img src="' + imageUrl + '" /></a>' +
                                    '</div>' +
                                    '<div class="details">' +
                                        '<a href="' + this.href + '"><h2>' + this.title + '</h2></a>' +
                                        '<h3>Basic Ingredients: ' + this.ingredients + '</h3>' +
                                        '<p>Courtesy of <a href="' + this.href + '">' + this.href +
                                        '</a></p>' +
                                    '</div>' +
                                 '</div>';

                    $('.results').append(recipeBlurb);
                });

            } else {// shouldn't ever happen

            }
        }).error(function() {// 400 BAD REQUEST case (broken date, before APOD started, etc)
            statusMessage.html("<h2>Sorry! No recipes found, try another search!</h2>");
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