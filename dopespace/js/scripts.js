// populate map, will be dynamically chosen later
function buildMap() {
    // build map
    map.forEach( function (location) {
        $('.map ul').append(
            '<li><a href="#" id="' +
            location.title +
            '">' +
            location.title.toUpperCase() +
            '</a></li>');
    });
}

// custom alert message
function showAlert(title, description) {
    var alert = $('.alert'),
        alertTitle = $('.alert-title'),
        alertDescrip = $('.alert-description');

    alertTitle.text(title);
    alertDescrip.text(description);
    alert.show();

}
// onLoad
//////////
$(function() {

    buildMap();
    // bindings
    $('#map').click(function() {
        $('.map').slideDown();
    });
    $('.map .close').click(function() {
        $('.map').slideUp();
    });
    $('.map ul li a').click(travel);
    $('.alert .close').click(function() {
        $('.alert').fadeOut(500);
    });
    // TODO: find better way to do first travel
    $('#Earth').click();
    evalLootStockCargo();

});