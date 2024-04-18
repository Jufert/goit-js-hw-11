import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '43439546-09d160f4f6cc02f4d93a741f2';
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const textInput = document.querySelector('.search-input');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loader = document.querySelector('.loader');
searchForm.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const values = textInput.value.trim();
  if (!values) {
    iziToast.warning({
      title: 'Warning!',
      message: 'Please enter image name!',
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  loader.style.display = 'flex';
  const search = new URLSearchParams({
    key: API_KEY,
    q: values,
    image_type: 'horizontal',
    safesearch: true,
  });
  fetch(`https://pixabay.com/api/?${search}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topCenter',
        });
        return;
      }
      renderImages(data.hits);
      lightbox.refresh();
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        message: 'Failed to fetch images. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

function renderImages(images) {
  const fragmentDocument = document.createDocumentFragment();
  images.forEach(image => {
    const imageCard = createImageCard(image);
    fragmentDocument.appendChild(imageCard);
  });
  gallery.appendChild(fragmentDocument);
}

function createImageCard(image) {
  const imageCard = document.createElement('div');
  imageCard.classList.add('card');
  imageCard.innerHTML = `
    <a class="gallery-link" href="${image.largeImageURL}">
      <img class="card-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
    </a>
    <div class="card-info">
      <p class="card-text"><b>Likes:</b> ${image.likes}</p>
      <p class="card-text"><b>Views:</b> ${image.views}</p>
      <p class="card-text"><b>Comments:</b> ${image.comments}</p>
      <p class="card-text"><b>Downloads:</b> ${image.downloads}</p>
    </div>
  `;
  return imageCard;
}

function clearGallery() {
  gallery.innerHTML = '';
}