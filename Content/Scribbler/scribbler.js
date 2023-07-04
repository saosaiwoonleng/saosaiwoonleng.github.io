// utilities
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

jQuery(document).ready(function ($) {

    $triggered_times = 0;

    $(window).on('scroll', function () {

        var y_scroll_pos = window.pageYOffset;
        var scroll_pos_test = 20;   // set to whatever you want it to be

        if (y_scroll_pos > scroll_pos_test && $triggered_times == 0) {



// setup typewriter effect in the terminal demo
if (document.getElementsByClassName('demo').length > 0) {
  var i = 0;
    var txt = `
Software Engineer with two years of professional experience.

Accomplished 2 Windows Apps 🖥️, 6 Web Apps 💻, 4 Electronic Projects 🤖, 1 Projects ⚙️ throughout my career 📈.
`;

var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
if (isMobile){
  $('#blackboard').css('height','700px');
  var speed = 1;   //60
}
else{
  var speed = 30;   //60
}

  function typeItOut () {
    if (i < txt.length) {
      document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeItOut, speed);
    }
  }

  setTimeout(typeItOut, 1800);
}
            $triggered_times = 1;   // to make sure the above action triggers only once

        }
    });

})