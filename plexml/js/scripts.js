// 152.208.9.6

$.ajax({
    url: "http://192.168.1.6:32400/library/recentlyAdded/?X-Plex-Token=xxcwJWERP477juYsw4MX",
    type: "GET",
    dataType: "html",
    success: function(data) {

    console.log(data);

    },
    error: function(jqXHR, textStatus, errorThrown ){
      // debug here
    }
});