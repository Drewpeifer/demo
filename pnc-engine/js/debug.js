var debugSection = $('#debug'),
    debugInfo = $('#debug-info'),
    debugButton = $('#debug button');

debugButton.click(function(data) {

    if (debugInfo.hasClass('active')) { // close if already open
        debugInfo.removeClass('active').hide();
    } else { // generate debug info on each reveal
        $.getJSON('https://dl.dropboxusercontent.com/u/282689/game/scratch.json', function(data) {
            var allItems = [],
                allActors = [],
                allObjects = [];

            $.each(data.items, function(item, title) {
                var title = this.title;
                // loop through items and build a list of their title attributes
                allItems.push('<br />' + item + ': ' + title);
            }),
            $.each(data.actors, function(item, title) {
                var title = this.title;
                // loop through actors and build a list of their title attributes
                allActors.push('<br />' + item + ': ' + title);
            }),
            $.each(data.objects, function(item, title) {
                var title = this.title;
                // loop through objects and build a list of their title attributes
                allObjects.push('<br />' + item + ': ' + title);
            }),

            console.log('did it!'),
            debugInfo.html(
                '<p>Area = '+
                data.area.title+
                '</p><p>useragent = '+
                navigator.userAgent+
                '</p><p>Items = [<br />'+
                allItems+
                '<br /><br />]</p><p>Actors = [<br />'+
                allActors+
                '<br /><br />]</p><p>Objects = [<br />'+
                allObjects+
                '<br /><br />]</p>'
            )
        }),
        debugInfo.addClass('active').show();
    }
}),

$(document).ready(function() {
    debugInfo.hide(),

    $.getJSON('https://dl.dropboxusercontent.com/u/282689/game/scratch.json', function(data) {
        if (data.client.debug === true) {
            debugSection.show()
        } else {
            debugSection.hide()
        }
    })
});