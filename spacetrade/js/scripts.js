$(document).ready(function(){
  makeManyStars();
  buildMarket(stats.port);// builds initial marketplace
  //showWelcome();
  // enable tooltipster via tooltips.js
  buildTooltips();
  $('.tooltip').tooltipster({
      theme: 'tooltipster-light',
      animation: 'fade',
      arrow: true,
      maxWidth: 400,
      timer: 6000,
      delay: 1000
  }).addClass('unselectable');

// fill in the placeholder on the welcome screen if there's an old captain name
  if (document.cookie.match(/^(.*;)?\s*lastCaptainName\s*=\s*[^;]+(.*)?$/)) {
    lastCapt = getCookie('lastCaptainName');
    $('#captain').val(lastCapt);
  } else {
    $('#captain').attr('placeholder','New Captain');
  }

});
$('#highScores').bind('click', function() {
  $('#scores li').toggleClass('toggle');
});

//// debug mode //////
debugMode = false;//// set to false in production
//////////////////////
if (debugMode) {
  // bind debug button
  $('#debug').bind('click', function() {
    $('#debugPanel').toggle();
  });
  // bind increase/decrease buttons to stat object
  $('#debugPanel button').bind('click', function() {
    parentRow = $(this).closest('tr');
    parentStat = parentRow.attr('class');
    statIncrement = parseInt(parentRow.attr('data-increment'));

    if ($(this).hasClass('increase')) {
      // raise
      stats[parentStat] += statIncrement;
    } else {
      // lower
      if ((stats[parentStat] -= statIncrement) <= 0) {
        // make sure there are no negative numbers
        stats[parentStat] = 0;
      } else {
        stats[parentStat] -= statIncrement;
      }
    }
  });
} else {
  $('#debug, #clearCookie').hide();
};
// end debug