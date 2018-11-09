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
    serverUrl = 'http://152.208.23.228:14551';
    token = 'X-Plex-Token=xxcwJWERP477juYsw4MX';    
    baseUrl = serverUrl + '/library/sections/all?' + token;
    moviesUrl = serverUrl + '/library/sections/30/all?' + token;
    showsUrl = serverUrl + '/library/sections/5/all?' + token;
    recentlyAddedUrl = serverUrl + '/library/recentlyAdded/search?type=1&X-Plex-Container-Start=0&X-Plex-Container-Size=20&' + token;
    urls = [showsUrl,moviesUrl];// hiding recentlyAddedUrl for now

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
                                'data-src="' + imgUrl + '" ' +
                                'class="entry ' + type + ' lazy">' +
                                '<p class="name">' + name + ' (' + year + ')</p>' +
                                '<p class="rating-MPAA">Rated: ' + ratingMPAA + '</p>' +
                                '<p class="rating-audience">Rotten Tomatoes: ' + ratingAudience + '</p>' +
                                '</div>');
            // append it to the target list, set background
            entryInterface.appendTo(grid);
        });
    count = count + i;
    });
    console.log('total entries = ' + count);
    // append header
    $('.content h3').text('Total Entries: ' + count);
    // there's a bug with lazy load and dynamic elements that
    // means lazy load needs applied before the element renders,
    // or else the background starts loading immediately. So,
    // everything needs to be hidden (.content is set to display:none)
    // while we lazy load images
    $('.lazy').Lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        visibleOnly: true,
        beforeLoad: function(element) {
            // called before an elements gets handled
            console.log('BG starting load');
        },
        afterLoad: function(element) {
            // called after an element was successfully handled
            console.log('BG loaded!')
        },
        onError: function(element) {
            // called whenever an element could not be handled
            console.log('BG failed to load :(');
        },
        onFinishedAll: function() {
            // called once all elements was handled
            console.log('all BGs loaded');
        }
    });
    // now that all entries are appended and have lazy load applied,
    // reveal the entire grid of entries
    $('.content').show();
    // since the .content area was hidden (0 width) when the entries were appended,
    // they all stack on top of each other, and now we need to
    // initialize isotope on grid for a fresh sort, which re-aligns them
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
    // another bug with lazy load, even though the .content div
    // is visible, and so are the entries within it, and they've been
    // shuffled into horizontal rows by isotope, lazy load still doesn't
    // consider them "visible" until a scroll event is triggered,
    // so we have to do this hacky thing:
    $(window).scroll();
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
    // nothing here yet
});