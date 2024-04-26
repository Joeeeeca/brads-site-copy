// Define the hidePopupOverlay function in the global scope
function hidePopupOverlay() {
    $('#popup-overlay').css('display', 'none');
    $('.email-subscription-section').show();
}

$(document).ready(function() {
    // Call the hidePopupOverlay function whenever needed
    // For example, when a button with id="close-popup" is clicked
    $('#close-popup').click(function() {
        hidePopupOverlay();
    });
});


// Define the startCountdown function globally
function startCountdown($resultElement) {
    var countdown = 3; // Set countdown duration
    var countdownElement = $("<div id='countdown'></div>");

    // Check if $resultElement is defined and not null
    if ($resultElement && $resultElement.length > 0) {
        $resultElement.after(countdownElement);
    } else {
        // If $resultElement is undefined or null, append countdown element to body
        $("body").append(countdownElement);
    }

    // Set font size and margin top for countdown element
    countdownElement.css({
        "font-size": "10px", // Adjust font size for smaller screens
        "margin-top": "10px" // Adjust margin top as needed
    });

    var countdownInterval = setInterval(function() {
        countdown--;
        countdownElement.text("Redirecting in " + countdown + " seconds...");

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            // Hide the popup overlay after countdown ends
            $("#popup-overlay").css("display", "none");
        }
    }, 1000);
}

$(document).ready(function(){
    ajaxMailChimpForm($("#subscribe-form"), $("#subscribe-result"));

    // Turn the given MailChimp form into an ajax version of it.
    // If resultElement is given, the subscribe result is set as html to
    // that element.
    function ajaxMailChimpForm($form, $resultElement){
        // Hijack the submission. We'll submit the form manually.
        $form.submit(function(e) {
            e.preventDefault();

            if (!isValidEmail($form)) {
                var error =  "A valid email address must be provided.";
                $resultElement.html(error);
                $resultElement.css("color", "red");
            } else {
                $resultElement.css("color", "black");
                $resultElement.html("Subscribing...");
                if ($(window).width() <= 425) {
                    $resultElement.css("font-size", "10px"); // Adjust font size for smaller screens
                }
                submitSubscribeForm($form, $resultElement);
            }
        });
    }

    // Validate the email address in the form
    function isValidEmail($form) {
        // If email is empty, show error message.
        // contains just one @
        var email = $form.find("input[type='email']").val();
        if (!email || !email.length) {
            return false;
        } else if (email.indexOf("@") == -1) {
            return false;
        }

        return true;
    }

    // Submit the form with an ajax/jsonp request.
    // Based on http://stackoverflow.com/a/15120409/215821
    function submitSubscribeForm($form, $resultElement) {
        $.ajax({
            type: "GET",
            url: $form.attr("action"),
            data: $form.serialize(),
            cache: false,
            dataType: "jsonp",
            jsonp: "c", // trigger MailChimp to return a JSONP response
            contentType: "application/json; charset=utf-8",

            error: function(error){
                // According to jquery docs, this is never called for cross-domain JSONP requests
            },

            success: function(data){
                if (data.result != "success") {
                    var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
                    $resultElement.css("color", "red");

                    if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                        message = "You're already subscribed. Thank you.";
                        $resultElement.css("color", "black");
                    }

                    $resultElement.html(message);

                } else {
                    $resultElement.css("color", "black");
                    $resultElement.html("Thank You For Subscribing!");
                      // Check screen width and set font size accordingly
    if ($(window).width() <= 425) {
        $resultElement.css("font-size", "10px"); // Adjust font size for smaller screens
    }
                    $form.hide();
                    setCookie("subscriptionFormSubmitted", "true", 30); // Cookie expires in 30 days

                    // Log the value of the cookie
                    console.log("Cookie value after successful subscription:", getCookie("subscriptionFormSubmitted"));

                    // Start countdown after 2 seconds
                    setTimeout(function() {
                        startCountdown($resultElement);
                    }, 2000);
                }
            }
        });
    }
});


$(document).ready(function(){
  ajaxMailChimpForm($("#subscribe-form1"), $("#subscribe-result1"));

  // Turn the given MailChimp form into an ajax version of it.
  // If resultElement is given, the subscribe result is set as html to
  // that element.
  function ajaxMailChimpForm($form, $resultElement){

      // Hijack the submission. We'll submit the form manually.
      $form.submit(function(e) {
          e.preventDefault();

          if (!isValidEmail($form)) {
              var error =  "A valid email address must be provided.";
              $resultElement.html(error);
              $resultElement.css("color", "red");
          } else {
              $resultElement.css("color", "black");
              $resultElement.html("Subscribing...");
              submitSubscribeForm($form, $resultElement);
          }
      });
  }

  // Validate the email address in the form
  function isValidEmail($form) {
      // If email is empty, show error message.
      // contains just one @
      var email = $form.find("input[type='email']").val();
      if (!email || !email.length) {
          return false;
      } else if (email.indexOf("@") == -1) {
          return false;
      }

      return true;
  }

  // Submit the form with an ajax/jsonp request.
  // Based on http://stackoverflow.com/a/15120409/215821
  function submitSubscribeForm($form, $resultElement) {
      $.ajax({
          type: "GET",
          url: $form.attr("action"),
          data: $form.serialize(),
          cache: false,
          dataType: "jsonp",
          jsonp: "c", // trigger MailChimp to return a JSONP response
          contentType: "application/json; charset=utf-8",

          error: function(error){
              // According to jquery docs, this is never called for cross-domain JSONP requests
          },

          success: function(data){
              if (data.result != "success") {
                  var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
                  $resultElement.css("color", "red");

                  if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                      message = "You're already subscribed. Thank you.";
                      $resultElement.css("color", "black");
                  }

                  $resultElement.html(message);

              } else {
                  $resultElement.css("color", "black");
                  $resultElement.html("Thank You For Subscribing");
                  $form.hide();
                  setCookie("subscriptionFormSubmitted", "true", 30); // Cookie expires in 30 days

                      // Log the value of the cookie
                      console.log("Cookie value after successful subscription:", getCookie("subscriptionFormSubmitted"));
              }
          }
      });
  }

});





// Function to control the visibility of elements based on cookie value
function manageSubscriptionFormVisibility() {
    if (checkCookie("subscriptionFormSubmitted", "true")) {
        $('#popup-overlay').css('display', 'none');
        $('#subscribe-form1').hide();
        $('.email-subscription-section').hide();
        $('#subscribe-result1').show();
    } else {
        $('#popup-overlay').css('display', 'block');
    }
}

$(document).ready(function() {
    // Check the cookie when the page loads
    manageSubscriptionFormVisibility();
});



document.addEventListener('DOMContentLoaded', function() {
  const prevButton = document.querySelector('.prev-slide');
  const nextButton = document.querySelector('.next-slide');
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelector('.carousel-slides');
  const slides2 = document.querySelector('.carousel-slides2');

  let slideIndex = 0;
  const slideWidth = carousel.offsetWidth; // Width of each slide

  // Function to move the slides
  function moveSlides() {
    slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    console.log('Slide index:', slideIndex);
    console.log('Slide position:', slides.style.transform);
  }

  function moveSlides2() {
    const slideWidth2 = slides2.children[0].offsetWidth; // Width of the first slide in the second set
    const slideIndex2 = slideIndex * (window.innerWidth > 1024 ? 3 : 3.2); // Adjust based on screen width
    slides2.style.transform = `translateX(-${slideIndex2 * slideWidth2}px)`; // Update position
    console.log("Second carousel slide position:", slides2.style.transform);
  }

  // Event listener for the next button
  nextButton.addEventListener('click', function() {
    slideIndex++;
    if (slideIndex >= slides.children.length) {
      slideIndex = 0; // Reset index if it exceeds the number of slides
    }
    moveSlides();
    moveSlides2();
  });

  // Event listener for the previous button
  prevButton.addEventListener('click', function() {
    slideIndex--;
    if (slideIndex < 0) {
      slideIndex = slides.children.length - 1; // Set index to the last slide if it goes below 0
    }
    moveSlides();
    moveSlides2();
  });
});