import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  toggleLoader,
  toggleButton,
  scrollToNewImages,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#formImg');
const searchInput = document.querySelector('#searchImg');
const loadMoreButton = document.querySelector('#loadBtn');

let query = '';
let currentPage = 1;
const perPage = 15;
let totalHits = 0;

function handleData(data, append = false) {
  if (data.hits.length === 0) {
    iziToast.error({
      title: 'Error',
      message: 'No images found!',
    });
    return;
  }

  renderGallery(data.hits, append);
  totalHits = data.totalHits;

  if (currentPage * perPage >= totalHits) {
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
    });
    toggleButton(false);
  } else {
    toggleButton(true);
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = searchInput.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
    });
    return;
  }

  form.reset();
  clearGallery();
  toggleLoader(true);
  toggleButton(false);
  currentPage = 1;
  totalHits = 0;

  try {
    const data = await fetchImages(query, currentPage, perPage);
    toggleLoader(false);
    handleData(data);
  } catch (error) {
    toggleLoader(false);
    iziToast.error({ title: 'Error', message: 'Something went wrong.' });
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  toggleLoader(true);

  try {
    const data = await fetchImages(query, currentPage, perPage);
    toggleLoader(false);

    handleData(data, true);
    scrollToNewImages();
  } catch (error) {
    toggleLoader(false);
    iziToast.error({ title: 'Error', message: 'Something went wrong.' });
  }
});
