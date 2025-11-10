let mCurrentIndex = 0;
let mImages = [];
const mUrl = 'parks.json'; // Local JSON file
const mWaitTime = 5000; // 5 seconds
let mTimer;

$(document).ready(() => {
  $('.details').hide();

  // Fetch JSON data
  fetchJSON();

  // Event handlers
  $('.moreIndicator').click(function() {
    $(this).toggleClass('rot90 rot270');
    $('.details').slideToggle('slow');
  });

  $('#nextPhoto').click(() => showNextPhoto());
  $('#prevPhoto').click(() => showPrevPhoto());

  startTimer();
});

// Fetch JSON and store in mImages
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function(data) {
      mImages = data.images;
      swapPhoto(); // Show first image
    },
    error: function() {
      console.error('Failed to load JSON data.');
    }
  });
}

// Display photo and metadata
function swapPhoto() {
  if (mImages.length === 0) return;

  const currentImage = mImages[mCurrentIndex];
  $('#photo').attr('src', currentImage.imgPath);
  $('.location').text('Location: ' + currentImage.imgLocation);
  $('.description').text('Description: ' + currentImage.description);
  $('.date').text('Date: ' + currentImage.established);
}

// Show next photo
function showNextPhoto() {
  mCurrentIndex = (mCurrentIndex + 1) % mImages.length;
  swapPhoto();
}

// Show previous photo
function showPrevPhoto() {
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length;
  swapPhoto();
}

// Automatic timer
function startTimer() {
  clearInterval(mTimer);
  mTimer = setInterval(showNextPhoto, mWaitTime);
}
