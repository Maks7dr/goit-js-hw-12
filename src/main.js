// import { fetchImages } from './js/pixabay-api.js';
// import {
//   renderGallery,
//   clearGallery,
//   toggleLoader,
//   toggleButton,
// } from './js/render-functions.js';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// const form = document.querySelector('#formImg');
// const searchInput = document.querySelector('#searchImg');
// const loadMoreButton = document.querySelector('#loadBtn');

// let query = '';
// let currentPage = 1;
// const perPage = 15;
// let totalHits = 0;

// form.addEventListener('submit', async event => {
//   event.preventDefault();

//   query = searchInput.value.trim();
//   if (!query) {
//     iziToast.warning({
//       title: 'Warning',
//       message: 'Please enter a search term!',
//     });
//     return;
//   }

//   form.reset();
//   clearGallery();
//   toggleLoader(true);
//   toggleButton(false);
//   currentPage = 1;
//   totalHits = 0;

//   try {
//     const data = await fetchImages(query, currentPage, perPage);
//     toggleLoader(false);
//     if (data.hits.length === 0) {
//       iziToast.error({
//         title: 'Error',
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//       });
//       return;
//     }

//     renderGallery(data.hits);
//     totalHits = data.totalHits;
//     if (data.hits.length < perPage || totalHits <= perPage) {
//       iziToast.info({
//         title: 'Info',
//         message: "We're sorry, but you've reached the end of search results.",
//       });
//       toggleButton(false);
//     } else {
//       toggleButton(true);
//     }
//   } catch (error) {
//     toggleLoader(false);
//     iziToast.error({
//       title: 'Error',
//       message: 'Something went wrong. Please try again later.',
//     });
//   }
// });

// loadMoreButton.addEventListener('click', async () => {
//   currentPage++;
//   toggleLoader(true);

//   try {
//     const data = await fetchImages(query, currentPage, perPage);
//     toggleLoader(false);

//     const totalLoadedImages = currentPage * perPage;

//     if (totalLoadedImages >= totalHits) {
//       iziToast.info({
//         title: 'Info',
//         message: "We're sorry, but you've reached the end of search results.",
//       });
//       toggleButton(false);
//     }

//     renderGallery(data.hits, true);
//     scrollToNewImages();
//   } catch (error) {
//     toggleLoader(false);
//     iziToast.error({
//       title: 'Error',
//       message: 'Something went wrong. Please try again later.',
//     });
//   }
// });

// function scrollToNewImages() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    renderGallery(data.hits);
    totalHits = data.totalHits;

    if (currentPage * perPage >= totalHits) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      toggleButton(true);
    }
  } catch (error) {
    toggleLoader(false);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  toggleLoader(true);

  try {
    const data = await fetchImages(query, currentPage, perPage);
    toggleLoader(false);

    if (currentPage * perPage >= totalHits) {
      iziToast.info({
        title: 'Info',
        message: "You've reached the end of results.",
      });
      toggleButton(false);
    }

    renderGallery(data.hits, true);
    scrollToNewImages();
  } catch (error) {
    toggleLoader(false);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});
