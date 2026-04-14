import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
    clearGallery,
    createGallery,
    hideLoader,
    showLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from "./js/render-functions";

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.btn-load-more');

let currentQuery = '';
let page = 1;

hideLoadMoreButton();

form.addEventListener("submit", async (elem) => {
    elem.preventDefault();

    const query = elem.target.elements["search-text"].value.trim();

    if (!query) return;

    currentQuery = query;
    page = 1;

    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, page);
        const images = data.hits;

        if (images.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: "topRight"
            });
            return;
        }

        createGallery(images);

        if (page * 15 >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight"
            });
        } else {
            showLoadMoreButton();
        }

        page += 1;
    } catch (err) {
        iziToast.error({
            message: 'Something went wrong. Please try again later.',
            position: 'topRight'
        });
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, page);
        const images = data.hits;

        createGallery(images);

        const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });

        if (page * 15 >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight"
            });
        }

        page += 1;
    } catch (err) {
        iziToast.error({
            message: 'Something went wrong. Please try again later.',
            position: "topRight"
        });
    } finally {
        hideLoader();
    }
});