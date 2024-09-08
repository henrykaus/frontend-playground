const expandBtns = document.querySelectorAll('.expand-btn');
const images = document.querySelectorAll('.image');
const imageSets = document.querySelectorAll('.instruction-card');

const body = document.querySelector('body');
const carousel = document.querySelector('.carousel');
const closeImageBtn = document.querySelector('#close-image');
const prevImageBtn = document.querySelector('#prev-img-arrow');
const nextImageBtn = document.querySelector('#next-img-arrow');

// STATE
let imageIndices = []; // An implicit map of image index -> set index
let currImageIndex = null;

const openCarousel = (event, imgIndex) => {
  currImageIndex = imgIndex;
  const imageToExpand = images[currImageIndex].cloneNode();
  imageToExpand.classList.remove("image");
  imageToExpand.classList.add("carousel-img");

  hasLeftNeighbor() ? prevImageBtn.classList.add('shown') : prevImageBtn.classList.remove('shown');
  hasRightNeighbor() ? nextImageBtn.classList.add('shown') : nextImageBtn.classList.remove('shown');

  body.style.overflow = 'hidden';
  carousel.appendChild(imageToExpand);
  carousel.classList.add("shown");
}

const closeCarousel = (event) => {
  body.style.overflow = 'auto';
  currImageIndex = null;

  carousel.classList.remove("shown");
  prevImageBtn.classList.remove("shown");
  nextImageBtn.classList.remove("shown");

  // Remove image in carousel
  carousel.removeChild(carousel.querySelector('img'));
}

const hasLeftNeighbor = () => {
  const neighborIndex = currImageIndex - 1;
  return neighborIndex > -1 && imageIndices[currImageIndex] === imageIndices[neighborIndex];
};

const hasRightNeighbor = () => {
  const neighborIndex = currImageIndex + 1;
  return neighborIndex < images.length && imageIndices[currImageIndex] === imageIndices[neighborIndex];
};

const goToPrevImage = (event) => {
  if (currImageIndex === null || !hasLeftNeighbor()) {
    return;
  }

  currImageIndex -= 1;
  const imageToExpand = images[currImageIndex].cloneNode();
  imageToExpand.classList.remove("image");
  imageToExpand.classList.add("carousel-img");

  hasLeftNeighbor() ? prevImageBtn.classList.add('shown') : prevImageBtn.classList.remove('shown');
  hasRightNeighbor() ? nextImageBtn.classList.add('shown') : nextImageBtn.classList.remove('shown');

  carousel.removeChild(carousel.querySelector('img'));
  carousel.appendChild(imageToExpand);
}

const goToNextImage = (event) => {
  if (currImageIndex === null || !hasRightNeighbor()) {
    return;
  }

  currImageIndex += 1;
  const imageToExpand = images[currImageIndex].cloneNode();
  imageToExpand.classList.remove("image");
  imageToExpand.classList.add("carousel-img");

  hasLeftNeighbor() ? prevImageBtn.classList.add('shown') : prevImageBtn.classList.remove('shown');
  hasRightNeighbor() ? nextImageBtn.classList.add('shown') : nextImageBtn.classList.remove('shown');

  carousel.removeChild(carousel.querySelector('img'));
  carousel.appendChild(imageToExpand);
}


// Build data sets
imageSets.forEach((set, setIndex) => {
  const setImages = set.querySelectorAll('.image');
  setImages.forEach((img) => {
    imageIndices.push(setIndex);
  });
});

expandBtns.forEach((btn, imgIndex) => {
  btn.addEventListener('click', (event) => openCarousel(event, imgIndex));
});

closeImageBtn.addEventListener('click', (event) => closeCarousel(event));
prevImageBtn.addEventListener('click', (event) => goToPrevImage(event));
nextImageBtn.addEventListener('click', (event) => goToNextImage(event));
