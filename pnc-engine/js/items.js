// general inventory behavior
itemList.css({ x: -(inventory.width() + 40), opacity: 0 }) // start off-screen and fadeout
        .sortable(),

stashedItems.draggable({
    zIndex:10,
    snap:true,
    snapMode:'inner',
    revert:'invalid',
    connectToSortable:itemList,
    stack:'.object',
    start: function() {
        $('.item').removeClass('last-dragged'),
        $(this).addClass('being-dragged')
    },
    stop: function() {
        $(this).removeClass('being-dragged')
               .addClass('last-dragged')
    }
}),

// hide / show inventory (stash)
trigger.click(function() {
    var itemListWidth = (itemList.width() + 40); // recalc width of list + trigger
    // drawer slide and fade
    if (inventory.hasClass('open')) { // close
        itemList.transition({ x: -itemListWidth, easing: 'snap', opacity: 0 }, 2000, 'linear'),
        inventory.removeClass('open'),
        $('.trigger p').text('i');
    } else { // open
        itemList.transition({ opacity: 1, x: 0, easing: 'snap' }, 2000, 'linear'),
        inventory.addClass('open'),
        $('.trigger p').text('x');
    }
}),

// unstashed hover behavior
$('.ui,.actor,.item,.object').mouseenter(
    function() {
        prompt.fadeIn(500),
        promptText.text('you are hovering over ' + $(this).attr('name'));
    }
).mouseleave(
    function() {
        prompt.hide(),
        promptText.text('');
    }
),

// dropspot behavior
$('.object.dropspot').droppable({
    accept: 'li.ui-sortable.item.stashed',
    hoverClass: 'valid-drop',
    tolerance: 'touch',
    revert: 'invalid',
    drop: function() {
        console.log('OMNOMNOM i ate ' + $('.item.ui-sortable-helper').attr('name')),
        $('.item.ui-sortable-helper').remove();
    }
});