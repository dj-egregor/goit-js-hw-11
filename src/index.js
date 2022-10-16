import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// const inputEl = document.querySelector('[searchQuery]');
const axios = require('axios').default;
const APIKEY = '30622071-b7f240b19c0374f09e6aee33e';
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

// Notify.success('Sol lucet omnibus');

// const query = 'cat';
// const urlGetQuery = `https://pixabay.com/api/?key=${APIKEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
// console.log(urlGetQuery);

function searchPictures(event) {
  event.preventDefault();
  const query = event.target.searchQuery.value.trim();
  console.log(event.target.searchQuery.value);
  const urlGetQuery = `https://pixabay.com/api/?key=${APIKEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=2`;
  console.log(urlGetQuery);
  getPictures(urlGetQuery);
}

searchForm.addEventListener('submit', searchPictures);
buttonLoadMore.addEventListener('click', loadMore);

function loadMore() {
  console.log('load more');
}

async function getPictures(url) {
  try {
    const response = await axios.get(url);
    // console.log(response);
    console.log(response.data);
    const images = response.data.hits;

    // console.log(hits);

    if (images.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const content = images
      .map(image => {
        return (imageHtml = `
<div class="photo-card">
  <a class="image-link" href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" width="300" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class="count">${image.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span class="count">${image.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span class="count">${image.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span class="count">${image.downloads}</span>
    </p>
  </div>
</div>`);
      })
      .join('');

    //   console.log(content);
    gallery.innerHTML = content;

    const gal = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });

    console.log(gal);
    // for (const image of images) {
    //   console.log(image);

    //   console.log(imageHtml);
    // }

    // gallery;
    // webformatURL - ссылка на маленькое изображение для списка карточек.
    // largeImageURL - ссылка на большое изображение.
    // tags - строка с описанием изображения. Подойдет для атрибута alt.
    // likes - количество лайков.
    // views - количество просмотров.
    // comments - количество комментариев.
    //   downloads - количество загрузок.
  } catch (error) {
    console.error(error);
  }
}
