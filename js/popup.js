var openPopup = document.getElementById('open-popup');
var closePopup = document.getElementById('close-popup');
var popupContainer = document.getElementById('popup-container');

openPopup.addEventListener('click', function() {
  popupContainer.style.display = 'block';
});

closePopup.addEventListener('click', function() {
  popupContainer.style.display = 'none';
});

popupContainer.addEventListener('click', function(event) {
  // If the click happened outside of the popup content, hide the popup
  if (event.target === popupContainer) {
    popupContainer.style.display = 'none';
  }
});

const enrollButton = document.querySelector('#enroll-button');
enrollButton.addEventListener('click', () => {
  alert('You have enrolled in the course!');
});