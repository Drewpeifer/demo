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
    urls = [recentlyAddedURL,tvURL,moviesURL];
    // for each entry in urls, grab XML and print UI
    $.each(urls, function(i, url) {
        wrapper = $('.content');
        payload = $.getPayload(url);
        // target the entries within the payload
        target = payload.children[0].children;
        // target first entry for sample data
        firstItem = $(payload.children[0].children[0]);
        // count entries
        targetCount = target.length;
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
        // build UI (section, header, toggle, and empty list)
        listPanel = '<div class="section ' + targetType + '"><h3>' +
                    targetLibrary + ': ' + targetCount +
                    '</h3><p class="toggle">[Expand]</p><hr />' +
                    '<ul class="' + targetType + '"></ul></div>';
        // append UI to content area
        $(listPanel).appendTo(wrapper);

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

            targetList = $('.content ul.' + type);

            // build UI for each entry
            entryInterface = $('<li><p>' + name + ' (' + year + ')</p></li>');
            // append it to the target list, set background
            entryInterface.appendTo(targetList)
                          .css({'background-image':'url(' + imgURL + ')'});
        });

    });

    // bind section hide/show controls
    $('p.toggle').bind('click', function() {
        toggle = $(this);
        toggle.siblings('ul').toggleClass('active');
        toggle.toggleClass('active');

        if (toggle.hasClass('active')) {
            toggle.text('[Collapse]');
        } else {
            toggle.text('[Expand]');
        }
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
});