const url = 'https://picsum.photos/v2/list?limit=10&page=';
let currentPage = 1;
let currentImages;
let upcomingImages;
let currentCarouselIndex = 0;
let firstCarouselIndex;
let lastCarouselIndex;
const carousel = document.getElementById('carousel');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');

const fetchImages = async () => {
  try{
    // fetch data from url and specified page
    const response = await fetch(url + currentPage);

    // throw error if response != ok
    if(!response.ok){
      throw new Error('Response status: ' + response.status);
    }

    // parse json from fetched data
    const json = await response.json();

    return json;
  }
  // catch & log error
  catch (error) {
    console.error(error.message);
  }
}

const setGalleryImages = async () => {
  upcomingImages = await fetchImages(currentPage + 1);

  // loop through images JSON
  for(const image of upcomingImages) {
  
    // create div and img elements, add neccessary tags
    const div = document.createElement('div');
    const img = document.createElement('img');

    div.className = 'item-gallery';

    img.src = image.download_url;
    img.alt = image.author;

    // append img to div, append div+img to gallery
    div.appendChild(img);
    gallery.appendChild(div);

  };
}

const setCarouselImages = async () => {
  currentImages = await fetchImages(currentPage);

  currentCarouselIndex = currentImages[0].id;
  firstCarouselIndex = currentImages[0].id;
  lastCarouselIndex = currentImages[currentImages.length - 1].id;

  // loop through images JSON
  for(const image of currentImages) {
  
    // create div and img elements, add neccessary tags
    const div = document.createElement('div');
    const img = document.createElement('img');

    div.className = 'item-carousel';
    div.dataset.id = image.id;

    img.src = image.download_url;
    img.alt = image.author;

    // add lightbox event listener
    img.addEventListener('click', function() {
      openLightbox(this.src, this.alt);
    })

    // append img to div, append div+img to gallery
    div.appendChild(img);
    carousel.appendChild(div);

    // put first image onto canvas
    carousel.querySelector('[data-id="' + currentCarouselIndex + '"]').style.left = '0';
  };
}

const carouselNext = () => {
  // if theres a next image, move current image to the left, next image to center
  if(currentCarouselIndex < lastCarouselIndex){
    carousel.querySelector('[data-id="' + currentCarouselIndex + '"]').style.left = 'calc(-100% - 16px)';
    currentCarouselIndex ++;
    carousel.querySelector('[data-id="' + currentCarouselIndex + '"]').style.left = '0';
  }
  else{
    changePage(currentPage + 1);
  }
}

const carouselPrev = () => {
  // if theres a next image, move current image to the left, next image to center
  if(currentCarouselIndex > firstCarouselIndex){
    carousel.querySelector('[data-id="' + currentCarouselIndex + '"]').style.left = 'calc(100% + 16px)';
    currentCarouselIndex --;
    carousel.querySelector('[data-id="' + currentCarouselIndex + '"]').style.left = '0';
  }
  else if(currentPage > 1){
    changePage(currentPage - 1);
  }
}

// fetch images from page parameter
const changePage = (page) => {
  // set current page to page from parameter
  currentPage = page;

  // remove current images from carousel & gallery
  for(const item of carousel.querySelectorAll(':scope > .item-carousel')){
    item.remove();
  }

  for(const item of gallery.querySelectorAll(':scope > .item-gallery')){
    item.remove();
  }

  // set new carousel & gallerys
  setCarouselImages();
  setGalleryImages();
}

// call changePage function with param currentPage+1
const nextPage = () => {
  changePage(currentPage + 1);
}

// call changePage function with param currentPage-1
const prevPage = () => {
  changePage(currentPage - 1);
}

// open modal box and set img src and alt text of clicked 
const openLightbox = (src, alt) => {
  modal.classList.add('open');
  modal.querySelector(':scope img').src = src;
  modal.querySelector(':scope img').alt = alt;
}

// close modal box
const closeLightbox = () => {
  modal.classList.remove('open');
}

// set carousel & gallery images on page load
setGalleryImages();
setCarouselImages();