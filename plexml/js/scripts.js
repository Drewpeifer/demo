// 152.208.9.6

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
    // build URLs
    serverURL = 'http://192.168.1.6:32400';
    token = 'X-Plex-Token=xxcwJWERP477juYsw4MX';    
    baseURL = 'http://192.168.1.6:32400/library/sections/all?' + token;
    moviesURL = 'http://192.168.1.6:32400/library/sections/30/all?' + token;
    tvURL = 'http://192.168.1.6:32400/library/sections/5/all?' + token;
    recentlyAddedURL = 'http://192.168.1.6:32400/library/recentlyAdded/search?type=1&X-Plex-Container-Start=0&X-Plex-Container-Size=20&' + token;
    urls = [tvURL,moviesURL];// hiding recentlyAddedURL for now
    // for each entry in urls, grab XML and print UI
    $.each(urls, function(i, url) {
        i = 0;// set count to 0
        wrapper = $('.content');
        payload = $.getPayload(url);
        // target the entries within the payload
        target = payload.children[0].children;
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
        console.log('targetType = ' + targetType + '. Returning results from ' + url);
        // build UI (header and empty grid)
        gridLayout = '<h3>Contents:</h3><hr /><div class="grid"></div>';
        // append UI to content area
        $(gridLayout).appendTo(wrapper);

        // parse payload items and build each entry into the DOM
        $(payload).find(target).each(function() {
            // store data for each entry
            entry = $(this),
            name = entry.attr('title'),
            year = entry.attr('year'),
            img = entry.attr('thumb'),
            imgURL = serverURL + img + '?' + token;

            // again, massage data for recently added entries
            if (targetType == 'recent') {
                type = 'recent';
            } else {
                type = entry.attr('type');
            }

            grid = $('.content .grid');

            // build UI for each entry
            entryInterface = $('<div class="' + type +
                            '"><p>' + name + ' (' + year + ')</p></div>');
            // append it to the target list, set background
            entryInterface.appendTo(grid)
                          .css({'background-image':'url(' + imgURL + ')'});
            // increment count
            i = i+1;
        });
        listCount = i;
        $('.content h3').text('Content: ' + listCount);
    });
}

// bind the query button
$('.query').click(renderData);

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
    // initialize isotope on the sortable areas
    $('.content .grid').isotope({
        itemSelector: '.content .grid div'
    });
});