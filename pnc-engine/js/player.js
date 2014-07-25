// idle and active states
function playerBeActive() {
    console.log('Function = playerBeActive'),
    player.removeClass('idle')
          .addClass('active');
}
function playerBeIdle() {
    console.log('Function = playerBeIdle'),
    player.removeClass('active')
          .addClass('idle')
          .sprite({
            on_first_frame: function(obj) {
                obj.spState(1),
                obj.spStart();
            },
            start_at_frame:1,
            fps: 5,
                no_of_frames:8,
            play_frames:16
          });
}

// face the right direction
function playerFace(e) {
    var clickX = e.pageX,
        clickY = e.pageY - e.target.offsetTop,
        playerX = player.offset().left,
        playerY = player.offset().top,
        offsetDiff = (clickX - playerX);

        console.log('Function = playerFace')
        console.log('you clicked ' + clickX + '/' + clickY)
        console.log ('you are at ' + playerX + '/' + playerY)
        console.log('offsetDiff = ' + offsetDiff)

    if (offsetDiff > 0) { // figure out which way to face
        player.addClass('face-right').removeClass('face-left');
    } else {
        player.addClass('face-left').removeClass('face-right');
    }

}

// click empty location
function playerGoTo(e) {
    var clickX = e.pageX,
        clickY = e.pageY - e.target.offsetTop;

    console.log('Function = playerGoTo'),
    playerFace(e), // face the right direction
    playerBeActive(), // be active when moving

    player.transition({
            'left' : clickX - (player.width() / 2),
            'top' : clickY - player.height(),
          }, 1000, 'linear', playerBeIdle) // be idle when stopped
          .sprite({
            on_first_frame: function(obj) {
                obj.spState(2),
                obj.spStart();
            },
            fps:6,
            start_at_frame:1,
            no_of_frames:6,
            play_frames:12
          });
    }

// picking up an item and stashing it
function playerGoToItem(e) {
    var clickX = e.pageX,
        clickY = e.pageY - e.target.offsetTop,
        activeItem = $(this), // clicked item
        itemName = activeItem.attr('name'),
        itemId = activeItem.attr('id'),
        itemPosition = activeItem.position(),
        playerPosition = player.position(),
        newItem = '<li id="' + itemId + '" name="' + itemName + '" class="ui-sortable item stashed"></li>';

    console.log('Function = playerGoToItem')
    playerFace(e) // face the right direction

    playerBeActive()

    if (player.hasClass('face-right')) {
      player.transition({ // makes player stop when right border is touching item
        'left' : itemPosition.left - player.width(),
        'top' : itemPosition.top - (player.height() / 2),
      }, 1800, 'linear', stashItem)
    } else {
      player.transition({ // makes player stop when left border is touching item
        'left' : itemPosition.left,
        'top' : itemPosition.top - (player.height() / 2),
      }, 1800, 'linear', stashItem)
    }

    player.sprite({ // same as goTo animation
            on_first_frame: function(obj) {
                obj.spState(2),
                obj.spStart();
            },
            fps:6,
            start_at_frame:1,
            no_of_frames:6,
            play_frames:12
          })

    function stashItem() {
        console.log('Function = stashItem'),
        playerBeIdle(),
        itemList.append(newItem) // dupe activeItem as stashed item
                .sortable(), // make sortable every time, dynamic elements need initialized
        activeItem.remove(); // remove activeItem from DOM
    }

    e.stopPropagation();

}


terrain.click(playerGoTo), // restrict movement to terrain
unstashedItems.click(playerGoToItem), // click an unstashed item to go get it
objects.click(playerGoToObject),

player.click(function(event) {

    console.log('stop clicking yourself'),

    event.stopPropagation();
}),
// start each game idle
$(document).ready(playerBeIdle);