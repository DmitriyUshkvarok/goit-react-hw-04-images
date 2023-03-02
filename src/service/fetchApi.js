import axios from 'axios';

const KEY = '31956588-280bf1dd69e9c5d9dc2771053';
const URL = 'https://pixabay.com/api/';

async function fetchApi(query, page = 1) {
  return await axios
    .get(
      `${URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
    )
    .then(response => response.data);
}

export default fetchApi;
