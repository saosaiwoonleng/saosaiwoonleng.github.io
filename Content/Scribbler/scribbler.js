// utilities
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

// Function to calculate the number of years from 1 Jul 2020 to the current date
function calculateYearsFromJuly2020() {
  const startDate = new Date('2020-07-01'); // Start date: 1 Jul 2020
  const currentDate = new Date(); // Current date and time

  // Calculate the difference in milliseconds
  const diffInMilliseconds = currentDate - startDate;

  // Convert the difference in milliseconds to years
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // 365.25 to account for leap years

  // Output the number of years
  return Math.floor(diffInYears); // Rounds the result to 2 decimal places
}

// Function to count the number of occurrences of a keyword in the page
function countKeyword(keyword) {
  // Get the class name of the entire page (from the body)
  const pageContent = document.getElementsByClassName(keyword);

  // If matches are found, return the count, otherwise return 0
  return Math.max(0, pageContent.length);
}

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
Software Engineer with ` + calculateYearsFromJuly2020() + ` years of professional experience.

Accomplished ` + countKeyword('windowsapplication') + ` Windows Apps 🖥️, ` + countKeyword('webapplication') + ` Web Apps 💻, ` + countKeyword('electronicproject') + ` Electronic Projects 🤖, ` + countKeyword('project') + ` Projects ⚙️ throughout my career 📈.
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