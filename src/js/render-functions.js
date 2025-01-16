import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function renderGallery(images, append = false) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
            />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>`
    )
    .join('');
  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}
export function toggleButton(show) {
  const loadMoreButton = document.querySelector('#loadBtn');
  loadMoreButton.style.display = show ? 'block' : 'none';
}
export function toggleLoader(show) {
  const loader = document.querySelector('.loader');
  loader.style.display = show ? 'inline-block' : 'none';
}
export function scrollToNewImages() {
  const firstCard = document.querySelector('.gallery .gallery-item');
  if (firstCard) {
    const { height: cardHeight } = firstCard.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
