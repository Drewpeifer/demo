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

function renderData() {

    section = $(this).attr('data-section');
    payloadURL = 'http://192.168.1.6:32400/library/sections/' + section + '/all?X-Plex-Token=xxcwJWERP477juYsw4MX';
    payload = $.getPayload(payloadURL);
    if (section == '30') {
        target = 'Video';
    } else if (section == '5') {
        target = 'Directory';
    } else {
        console.log('couldn\'t find a valid target!');
    }

    console.log(payloadURL);
    $(payload).find(target).each(function() {
        var name = $(this).attr('title');
        $('#content').append(name + ', ');
    });
}

$('.query').click(renderData);