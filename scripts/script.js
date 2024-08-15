const url = 'https://picsum.photos/v2/list?limit=10&page=';
let currentPage = 1;
let currentImages;
let upcomingImages;
let currentCarouselIndex = 0;

const fetchImages = async (page = currentPage) => {
  try{
    // fetch data from url and specified page
    const response = await fetch(url + page);

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

const setGalleryImages = async (page = currentPage + 1) => {
  upcomingImages = await fetchImages(page);
  const gallery = document.getElementById('gallery');

  // loop through images-JSON
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

const setCarouselImages = async (page = currentPage) => {
  currentImages = await fetchImages(page);
  const carousel = document.getElementById('carousel');

  // loop through images-JSON
  for(const image of currentImages) {
  
    // create div and img elements, add neccessary tags
    const div = document.createElement('div');
    const img = document.createElement('img');

    div.className = 'item-carousel';
    div.dataset.id = image.id;

    img.src = image.download_url;
    img.alt = image.author;

    // append img to div, append div+img to gallery
    div.appendChild(img);
    carousel.appendChild(div);
  };

  // add active-marker to first image
  carousel.querySelector('[data-id="0"]').classList.add('active');
}

const carouselNext = () => {
  const carousel = document.getElementById('carousel');

  // if theres a next image, move current image to the left, next image to center
  if(currentCarouselIndex < carousel.querySelectorAll(':scope > .item-carousel').length - 2){
    carousel.querySelector('[data-id="' + currentCarouselIndex + '"]').style.left = 'calc(-100% - 16px)';
    currentCarouselIndex ++;
    carousel.querySelector('[data-id="' + currentCarouselIndex + '"]').style.left = '0';
  }
  // else: get next set of images
  else{
    // do something
  }

}

setGalleryImages();
setCarouselImages();