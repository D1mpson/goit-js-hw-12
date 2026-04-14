import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-load-more');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
});

export function createGallery(images) {
    const markup = images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
            </a>
            <ul class="info">
                <li class="info-item"><b>Likes</b><span>${likes}</span></li>
                <li class="info-item"><b>Views</b><span>${views}</span></li>
                <li class="info-item"><b>Comments</b><span>${comments}</span></li>
                <li class="info-item"><b>Downloads</b><span>${downloads}</span></li>
            </ul>
        </li>`
        )
        .join("");

    galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    galleryContainer.innerHTML = "";
}

export function showLoader() {
    document.querySelector('.loader').classList.add('visible');
}

export function hideLoader() {
    document.querySelector('.loader').classList.remove('visible');
}

export function showLoadMoreButton() {
    loadMoreBtn.classList.add('visible');
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.remove('visible');
}