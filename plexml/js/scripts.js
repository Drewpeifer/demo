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
                // empty out the UI
                $('.stats, .content ul').html('');
                // show loading message
                $('.stats').html('<p>Loading...</p>');
            },
            complete: function() {
                // get rid of loading messages
                $('.stats').html('');
            },
            success: function(data) {
                console.log('ajax success');
                payload = data;
                console.log(payload);
            },
            error: function(jqXHR, textStatus, errorThrown ){
              // debug here
              console.log('Error! The media server must be down right now, sorry.');
            }
        });
       return payload;
    }
});

// PAYLOADS //
// base library locations
// Movies = 30
// TV = 5
// END PAYLOADS //

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
    recentlyAddedURL = 'http://192.168.1.6:32400/library/recentlyAdded?' + token;
    urls = [recentlyAddedURL,tvURL,moviesURL];
    // for each entry in urls, grab XML and print UI
    $.each(urls, function(i, url) {
        wrapper = $('.content');
        payload = $.getPayload(url);
        // target the entries within the payload
        target = payload.children[0].children;
        firstItem = $(payload.children[0].children[0]);
        // count entries
        targetCount = target.length;
        //store the name of the library being queried
        if ($(payload.children[0]).attr('mixedParents') == 1) {
            targetLibrary = 'Recently Added';
            // store the type of entries being displayed (show / movie)
            targetType = 'recent';
        } else {
            targetLibrary = $(payload.children[0]).attr('librarySectionTitle');
            // store the type of entries being displayed (show / movie)
            targetType = firstItem.attr('type');
        }
        console.log('targetType = ' + targetType + '. Returning results from ' + url);
        // build UI
        targetHeader = '<hr /><h3>' + targetLibrary + ': ' + targetCount + '</h3><hr />';
        targetList = '<ul class="' + targetType + '"></ul>';
        // print a header and empty list
        $(targetHeader).appendTo(wrapper);
        $(targetList).appendTo(wrapper);


        // parse and print payloads
        $(payload).find(target).each(function() {
            // store data for each entry
            entry = $(this),
            name = entry.attr('title'),
            year = entry.attr('year'),
            img = entry.attr('thumb'),
            imgURL = serverURL + img + '?' + token;

            if (targetType == 'recent') {
                type = 'recent';
            } else {
                type = entry.attr('type');
            }

            targetList = $('.content ul.' + type);

            // build UI for each entry and append it to the list
            entryInterface = $('<li><p>' + name + ' (' + year + ')</p></li>');

            entryInterface.appendTo(targetList).css({'background-image':'url(' + imgURL + ')'});
        });

    });

}

// bind the query buttons
$('.query').click(renderData);