// this function is fed a url and retrieves an XML payload
jQuery.extend({
    getPayload: function(url) {
        var payload = null;
        $.ajax({
            url: url,
            type: "GET",
            dataType: "xml",
            async: false,
            beforeSend: function() {
                // call starts
                $('.alert').html('<p>Loading!</p><p>Please wait for my tiny computer to process your request.</p>');
            },
            complete: function() {
                // call ends (before success/error)
                $('.alert').html('');
            },
            success: function(data) {
                console.log('ajax success');
                payload = data;
            },
            error: function(jqXHR, textStatus, errorThrown){
              // debug here
              console.log('Error! The media server must be down right now, sorry.');
            }
        });
       return payload;
    }
});

// this grabs the appropriate payload depending on which input requests it
// and then populates the UI with entries
function renderData() {
    wrapper = $('.content');
    // set count to 0
    count = 0;
    // build URLs
    serverUrl = 'http://152.208.9.6:23397';
    token = 'X-Plex-Token=xxcwJWERP477juYsw4MX';    
    baseUrl = serverUrl + '/library/sections/all?' + token;
    moviesUrl = serverUrl + '/library/sections/30/all?' + token;
    showsUrl = serverUrl + '/library/sections/5/all?' + token;
    recentlyAddedUrl = serverUrl + '/library/recentlyAdded/search?type=1&X-Plex-Container-Start=0&X-Plex-Container-Size=20&' + token;
    urls = [showsUrl,moviesUrl];// hiding recentlyAddedUrl for now

    // build UI (header and empty grid)
    gridLayout = '<h3>Contents:</h3><hr /><div class="grid"></div>';
    // append UI to content area
    $(gridLayout).appendTo(wrapper);
    // for each entry in urls, grab XML
    $.each(urls, function(i, url) {
        wrapper = $('.content');
        payload = $.getPayload(url);
        // target the entries within the payload
        target = payload.children[0].children;
        // count items
        i = target.length;
        // target first entry for sample data
        firstItem = $(payload.children[0].children[0]);
        // store the name of the library being queried;
        // recently added needs some massaging
        if ($(payload.children[0]).attr('mixedParents') == 1) {
            targetLibrary = 'Recently Added';
            targetType = 'recent';
        } else {
            targetLibrary = 'All ' + $(payload.children[0]).attr('librarySectionTitle');
            targetType = firstItem.attr('type');
        }
        console.dir(payload);
        console.log('targetType = ' + targetType + ' (' +
            i + '). Returning results from ' + url);
        // parse payload items and build each entry into the DOM
        $(payload).find(target).each(function() {
            // store data for each entry
            entry = $(this),
            name = entry.attr('title'),
            sortTitle = entry.attr('titleSort'),
            year = entry.attr('year'),
            img = entry.attr('thumb'),
            type = entry.attr('type'),
            duration = entry.attr('duration'),
            dateAdded = entry.attr('addedAt'),
            ratingMPAA = entry.attr('contentRating'),
            ratingAudience = entry.attr('audienceRating'),
            imgUrl = serverUrl + img + '?' + token,
            grid = $('.content .grid');

            // again, massage data for recently added entries
            if (targetType == 'recent') {
                type = 'recent';
            } else {
            };

            // build UI for each entry
            entryInterface = $('<div data-datereleased="' + year + '" ' +
                                'data-name="' + name + '" ' +
                                'data-dateadded="' + dateAdded + '" ' +
                                'data-sorttitle="' + sortTitle + '" ' +
                                'data-duration="' + duration + '" ' +
                                'class="entry ' + type + ' lazy">' +
                                '<p class="name">' + name + ' (' + year + ')</p>' +
                                '<p class="rating-MPAA">Rated: ' + ratingMPAA + '</p>' +
                                '<p class="rating-audience">Rotten Tomatoes: ' + ratingAudience + '</p>' +
                                '</div>');
            // append it to the target list, set background
            entryInterface.appendTo(grid)
                          .css({'background-image':'url(' + imgUrl + ')'});
        });
    count = count + i;
    });
    console.log('total entries = ' + count);
    // append header
    $('.content h3').text('Total Entries: ' + count);
    // initialize isotope on grid
    $('.grid').isotope({
        itemSelector: 'div.entry',
        layoutMode: 'fitRows',
        getSortData: {
            name: '.name',
            ratingMPAA: '.rating-MPAA',
            ratingAudience: '.rating-audience',
            dateReleased: '[data-datereleased]',
            dateAdded: '[data-dateadded]'
        },
        sortBy: 'name'
    });
}

// bind the query buttons
$('.query').click(renderData);
// filtering
$('button.filter').each(function() {
    $(this).click(function() {
        $('.grid').isotope({ filter: '.' + $(this).attr('data-filter') });
        console.log('now filtering by ' + $(this).attr('data-filter'));
    });
});
// sorting
$('button.sort').each(function() {
    $(this).click(function() {
        $('.grid').isotope({ sortBy: $(this).attr('data-sort') });
        console.log('now sorting by ' + $(this).attr('data-sort'));
    });
});
// on load
$(function() {
    // lazy load images
    $('.lazy').Lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        visibleOnly: true,
        onError: function() {
            console.log('error loading an image!');
        }
    });
});