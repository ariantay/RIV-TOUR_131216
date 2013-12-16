$(function(){
  $('.slider-arrow').click(function(){
  var anchor = this;
  var removeClass = "show";
  var addClass = "hide";
  var diff = "-=300";
  var arrows = "&laquo;";
  if($(anchor).hasClass("hide")){
    diff = "+=300";
    removeClass = "hide";
    addClass="show";
    arrows = '&raquo;';
  }
  $( ".slider-arrow, .panel" ).animate({
    left: diff
    }, 700, function() {
    // Animation complete.
      $(anchor).html(arrows).removeClass(removeClass).addClass(addClass);
    });     
  });   
});