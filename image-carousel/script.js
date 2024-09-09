// State variables
let imageToSetMap = [];
let currImageIndex = null;

// Locators
const imageSets = document.querySelectorAll(".image-set");
const images = document.querySelectorAll(".image");
const expandBtns = document.querySelectorAll(".expand-btn");

const body = document.querySelector("body");
const carousel = document.querySelector("#carousel");
const closeImageBtn = document.querySelector("#close-image");
const prevImageBtn = document.querySelector("#prev-img-arrow");
const nextImageBtn = document.querySelector("#next-img-arrow");

// Functions
const openCarousel = (event, imgIndex) => {
  currImageIndex = imgIndex;

  // Place image in carousel
  const imageToExpand = images[currImageIndex].cloneNode();
  imageToExpand.classList.remove("image");
  imageToExpand.classList.add("carousel-img");
  carousel.appendChild(imageToExpand);

  // Show prev/next buttons if necessary
  hasLeftNeighbor() ? prevImageBtn.classList.add("shown") : prevImageBtn.classList.remove("shown");
  hasRightNeighbor() ? nextImageBtn.classList.add("shown") : nextImageBtn.classList.remove("shown");

  // Stop user from scolling
  body.style.overflow = "hidden";
  body.style.maxHeight = "100%";

  // Show carousel
  carousel.classList.add("shown");
}

const closeCarousel = (event) => {
  currImageIndex = null;

  // Resume scolling
  body.style.overflow = "auto";
  body.style.maxHeight = "unset";

  // Hide carousel and prev/next buttons
  carousel.classList.remove("shown");
  prevImageBtn.classList.remove("shown");
  nextImageBtn.classList.remove("shown");

  // Remove image in carousel
  carousel.removeChild(carousel.querySelector("img"));
}

const hasLeftNeighbor = () => {
  const neighborIndex = currImageIndex - 1;
  return neighborIndex > -1 && imageToSetMap[currImageIndex] === imageToSetMap[neighborIndex];
};

const hasRightNeighbor = () => {
  const neighborIndex = currImageIndex + 1;
  return neighborIndex < images.length && imageToSetMap[currImageIndex] === imageToSetMap[neighborIndex];
};

const goToImage = (event, direction) => {
  // Set current image
  currImageIndex += direction === "prev" ? -1 : 1;

  // Show prev/next buttons if necessary
  hasLeftNeighbor() ? prevImageBtn.classList.add("shown") : prevImageBtn.classList.remove("shown");
  hasRightNeighbor() ? nextImageBtn.classList.add("shown") : nextImageBtn.classList.remove("shown");

  // Replace current image with neighbor image
  const imageToExpand = images[currImageIndex].cloneNode();
  imageToExpand.classList.remove("image");
  imageToExpand.classList.add("carousel-img");
  carousel.removeChild(carousel.querySelector("img"));
  carousel.appendChild(imageToExpand);
}

// Create mapping of image index -> set index
imageSets.forEach((set, setIndex) => {
  const setImages = set.querySelectorAll(".image");
  setImages.forEach((img) => {
    imageToSetMap.push(setIndex);
  });
});

// Add event listeners
expandBtns.forEach((btn, imgIndex) => {
  btn.addEventListener("click", (event) => openCarousel(event, imgIndex));
});
closeImageBtn.addEventListener("click", (event) => closeCarousel(event));
prevImageBtn.addEventListener("click", (event) => goToImage(event, "prev"));
nextImageBtn.addEventListener("click", (event) => goToImage(event, "next"));
