function playerGoToObject() {

}

$('.object').click(function(event) {

    console.log($(this).attr('id')),
    event.stopPropagation();

});