let mCurrentIndex = 0
let mImages = []
const mUrl = 'images.json'
const mWaitTime = 5000
let timer

$(document).ready(() => {
  $('.details').hide()

  $('.moreIndicator').click(() => {
    $('.moreIndicator').toggleClass('rot90 rot270')
    $('.details').slideToggle(400)
  })

  $('#nextPhoto').click(() => showNextPhoto())
  $('#prevPhoto').click(() => showPrevPhoto())

  fetchJSON()
})

function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images
      if (mImages.length > 0) {
        mCurrentIndex = 0
        swapPhoto()
        startTimer()
      }
    },
    error: function () {
      console.error('Failed to load JSON data.')
    }
  })
}

function swapPhoto() {
  if (mImages.length === 0) return
  const currentImage = mImages[mCurrentIndex]
  $('#photo').attr('src', currentImage.imgPath)
  $('.location').text(`Location: ${currentImage.imgLocation}`)
  $('.description').text(`Description: ${currentImage.description}`)
  $('.date').text(`Established: ${currentImage.Established}`)
}

function showNextPhoto() {
  mCurrentIndex = (mCurrentIndex + 1) % mImages.length
  swapPhoto()
}

function showPrevPhoto() {
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length
  swapPhoto()
}

function startTimer() {
  clearInterval(timer)
  timer = setInterval(showNextPhoto, mWaitTime)
}
