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
Freelance Software Engineer, currently learning and developing algorithmic trading bot 🤖 and building Gaming PCs 🎮. 

Accomplished 6 Web Applications 💻 and 3 Electronic Projects 🤖 throughout my career 📈.
`;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  var speed = 1;
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
