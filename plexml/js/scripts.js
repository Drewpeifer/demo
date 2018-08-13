// 152.208.9.6

// go grab the plex XML payload when passed a payload url
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
function renderData() {
    // grab the section from the button attribute
    section = $(this).attr('data-section');
    // build it into the ajax query url
    payloadURL = 'http://192.168.1.6:32400/library/sections/' + section + '/all?X-Plex-Token=xxcwJWERP477juYsw4MX';
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

    console.log(payloadURL);
    // parse the payload and print titles
    $(payload).find(target).each(function() {
        var name = $(this).attr('title');
        $('.content ul').append('<li><p>' + name + '</p></li>');
    });
}

// bind the query buttons
$('.query').click(renderData);