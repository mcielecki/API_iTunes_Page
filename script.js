// All code and comments created by Marcin Cielecki 2018
'use strict';
const navigation = {
    minPage: 1,
    maxPage: 1,
    currentPage: 1
};

const listItems = {
    resultCount: 0,
    results: []
};

function showSearchResults(text) {
    let searchInfo = document.querySelector(".search-results");
    document.querySelector(".search-results").classList.add("search-results-visible");
    searchInfo.innerHTML = text
};

function displayResultsOnAjaxSuccess(ourData) {
    let searchCounter = ourData.resultCount;
    const searchValue = document.querySelector(".page-search").value
    let title = document.querySelector(".search-boxes");

    listItems.resultCount = searchCounter;
    listItems.results = ourData.results;

    // check condition contained in guideline
    if (searchValue === "" || searchCounter === 0) {
        title.innerHTML = ""
        showSearchResults(`Sorry, no matches found.`);
        document.querySelector(".buttons-cont").classList.remove("prev-next-visible");
    } else {
        title.innerHTML = ""
        showSearchResults(`Found ${searchCounter} songs`);
        renderResults();
    }
};

function renderResults() {
    let totalNumberOfItems = listItems.resultCount;
    let results = listItems.results;

    let title = document.querySelector(".search-boxes");
    title.innerHTML = "" // innerHTML to clear divs board from previous search
    let htmlString = ""

    const itemsPerPage = 9;
    navigation.maxPage = Math.ceil(totalNumberOfItems / itemsPerPage); // total pages equal round out number
    let startItem = (navigation.currentPage - 1) * itemsPerPage;
    let lastItem = (navigation.currentPage * itemsPerPage);

    // loop to create div elements with loaded data from API
    for (let i = startItem; i < lastItem; i++) {
        if (typeof results[i] === 'undefined') {
            break;
        }
        else {
        htmlString += `<a href="${results[i].previewUrl}"><div class="search-item"><div class="image-box"><img src="${results[i].artworkUrl100}" alt="Image to this item" class="song-image"></div>`
        htmlString += `<div class="song-info"><p class="song-title">${results[i].trackName}</p><p class="song-author">${results[i].artistName}</p></div></a></div>`
    }
}

    htmlString += `<div class="clear"></div>`
    title.insertAdjacentHTML('beforeend', htmlString);

    if (totalNumberOfItems > 9) {
        document.querySelector(".buttons-cont").classList.add("prev-next-visible")
    } else {
        document.querySelector(".buttons-cont").classList.remove("prev-next-visible")

    }
};

//start
document.addEventListener('DOMContentLoaded', function () {

    const btn = document.querySelector(".page-button");
    const searchValueElement = document.querySelector(".page-search");

    eventHandlers.callback = displayResultsOnAjaxSuccess;
    searchValueElement.addEventListener("keyup", eventHandlers.onKeyUp);
    btn.addEventListener("click", eventHandlers.onSearch);

    //pagination buttons
    document.querySelector("#next-page").addEventListener("click", function () {

        if (navigation.currentPage + 1 > navigation.maxPage) {
            return;
        } else {
            navigation.currentPage++;
            renderResults();
        }
    });

    document.querySelector("#previous-page").addEventListener("click", function () {
        if (navigation.currentPage - 1 < navigation.minPage) {
            return;
        } else {
            navigation.currentPage--;
            renderResults();
        }
    });
});
