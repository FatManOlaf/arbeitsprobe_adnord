const url = 'https://picsum.photos/v2/list?limit=10&page=';

const fetchImages = async (page = 1) => {
  try{
    // fetch data from url specified page
    const response = await fetch(url + page);

    // throw error if response != ok
    if(!response.ok){
      throw new Error('Response status: ' + response.status);
    }

    // parse json from fetched data
    const json = await response.json();
    
    console.log(json);
    return json;
  }
  // catch & log error
  catch (error) {
    console.error(error.message);
  }
}

const setGalleryImages = async (page = 1) => {
  const images = await fetchImages(page);
  const gallery = document.getElementById('gallery');

  for(const image of images) {
  
    console.log(image);

    const div = document.createElement('div');
    const img = document.createElement('img');

    div.className = 'item-gallery';

    img.src = image.download_url;
    img.alt = 'Photo by ' + image.author;

    div.appendChild(img);
    gallery.appendChild(div);

  };
}