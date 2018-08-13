// 152.208.9.6

// go grab the plex XML payload
jQuery.extend({
    getPayload: function(url) {
        var payload = null;
        $.ajax({
            url: "http://192.168.1.6:32400/library/recentlyAdded/?X-Plex-Token=xxcwJWERP477juYsw4MX",
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

var payload = $.getPayload("http://192.168.1.6:32400/library/recentlyAdded/?X-Plex-Token=xxcwJWERP477juYsw4MX");

function renderData() {
    console.log(payload);
    $(payload).find('Video').each(function() {
        var name = $(this).attr('title');
        $('#content').append(name + ', ');
    });
}

$('#fetchXML').click(renderData);