// THE GLOBALS!
var ui =            $('.ui'),
    actors =        $('.actor'),
    items =         $('.item'),
    stashedItems =  $('.item.stashed'),
    unstashedItems =  $('.item.unstashed'),
    objects =       $('.object'),
    avatar =        $('#avatar'),
    prompt =        $('#prompt'),
    promptText =    $('#prompt p'),
    itemAlpha =     $('#alpha'),
    itemBravo =     $('#bravo'),
    itemCharlie =   $('#charlie'),
    itemDelta =     $('#delta'),
    terrain =       $('.terrain'),
    dropspot =      $('.dropspot'),
    radio =         $('#radio'),
    player =        $('#player'),
    trigger =       $('.trigger'),
    inventory =     $('#inventory'),
    itemList =      $('#inventory ul');

$('#radio').click(function() {
    var $this = $(this),
        radio = $('#radio-player')[0];

    if ($this.hasClass('off')) {
        $this.removeClass('off').addClass('on'),
        radio.play();
    } else {
        $this.removeClass('on').addClass('off'),
        radio.pause();
    }
    
}),

$(document).ready(function() {
    prompt.hide() // hide prompt at beginning
});
