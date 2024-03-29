document.addEventListener("DOMContentLoaded", function () {


  // Function to show the thank you section
  function showThankYouSection() {
    document.getElementById("thank-you-section").style.display = "block";
  }

  var popupOverlay = document.getElementById("popup-overlay");
  var closePopupButton = document.getElementById("close-popup");
  var emailSubscriptionSection = document.querySelector(".email-subscription-section");

 


  

  // Close the popup when the close button is clicked
  closePopupButton.addEventListener("click", function () {
    document.getElementById("popup-overlay").style.display = "none";
    // Show the email subscription section
    emailSubscriptionSection.style.display = "block";
  });

});
