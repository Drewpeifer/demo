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
                $('.stats').html('');
            },
            success: function(data) {
                console.log('ajax success');
                payload = data;
                console.log(payload);
            },
            error: function(jqXHR, textStatus, errorThrown ){
              // debug here
              console.log('error! something bad happened');
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
    // grab the section from the button attribute
    section = $(this).attr('data-section');
    // build URLs
    serverURL = 'http://192.168.1.6:32400';
    token = 'X-Plex-Token=xxcwJWERP477juYsw4MX';
    // build the payload URL for the selected section / library
    payloadURL = serverURL + '/library/sections/' + section + '/all?' + token;
    // store the payload
    payload = $.getPayload(payloadURL);
    // target the entries within the payload
    target = payload.children[0].children;
    // count entries
    targetCount = target.length;
    // store the type of entries being displayed (show / movie)
    targetType = $(payload.children[0].children[0]).attr('type');

    console.log('Returning results from ' + payloadURL);

    // append stats for targeted payload
    $('.stats').append('<p>' + targetType + 's: ' + targetCount + '</p>');

    // sift through entries and build an interface for each one
    $(payload).find(target).each(function() {
        // store data for each entry
        var list = $('.content ul'),
            entry = $(this),
            name = entry.attr('title'),
            year = entry.attr('year'),
            img = entry.attr('thumb'),
            imgURL = serverURL + img + '?' + token;

        // build UI for each entry and append it to the list
        entryInterface = $('<li><p>' + name + ' (' + year + ')</p></li>');

        entryInterface.appendTo(list).css({'background-image':'url('+imgURL+')'});
    });
}

// bind the query buttons
$('.query').click(renderData);