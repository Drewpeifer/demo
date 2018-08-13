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
function queryData() {
    // grab the section from the button attribute
    section = $(this).attr('data-section');
    serverURL = 'http://192.168.1.6:32400';
    token = 'X-Plex-Token=xxcwJWERP477juYsw4MX';
    // build it into the ajax query url
    payloadURL = serverURL + '/library/sections/' + section + '/all?' + token;
    // store the payload
    payload = $.getPayload(payloadURL);
    // find the appropriate XML child object depending on what
    // section was queried
    if (section == '30') {// movies
        target = 'Video';
    } else if (section == '5') {// tv
        target = 'Directory';
    } else {// queried an unauthorized / missing section
        console.log('couldn\'t find a valid target!');
    }

    console.log('Returning results from ' + payloadURL);

    console.dir(payload);
    $(payload).find(target).each(function() {
        // list data for each entry
        var list = $('.content ul'),
            entry = $(this),
            name = entry.attr('title'),
            year = entry.attr('year');
            img = entry.attr('thumb'),
            imgURL = serverURL + img + '?' + token;

        // build UI for each entry and append it to the list
        entryInterface = $('<li><p>' + '. ' + name + ' (' + year + ')</p></li>');

        entryInterface.appendTo(list).css({'background-image':'url('+imgURL+')'});
    });
}

// bind the query buttons
$('.query').click(queryData);