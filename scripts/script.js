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
    
    return json;
  }
  // catch & log error
  catch (error) {
    console.error(error.message);
  }
}