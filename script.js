// All code and comments created by Marcin Cielecki 2018

document.addEventListener('DOMContentLoaded', function () {

    // 2 variables to make search by pressing "Enter" key posibble
    const btn = document.querySelector(".page-button");
    let searchValue = document.querySelector(".page-search");

    searchValue.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) { // 13 is keyCode of "Enter"
            btn.click();
        }
    });

    btn.addEventListener("click", function () {

        //get a user string value to searcher
        searchValue = document.querySelector(".page-search").value

        let ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', `https://itunes.apple.com/search?term=${searchValue}&entily=song`);

        // parse our request to JSON form and get amount of results
        ourRequest.onload = function () {
            let ourData = JSON.parse(ourRequest.responseText);
            let searchInfo = document.querySelector(".search-results");
            let searchCounter = ourData.results.length;

            // check condition contained in guideline
            if (searchValue === "" || searchCounter === 0) {
                document.querySelector(".search-results").classList.add("search-results-visible");
                searchInfo.innerHTML = `Sorry, no matches found.`
            } else {
                document.querySelector(".search-results").classList.add("search-results-visible");
                searchInfo.innerHTML = `Found ${searchCounter} songs`

                function renderHTML() {
                    let title = document.querySelector(".search-boxes");
                    title.innerHTML = "" // innerHTML to clear divs board from previous search
                    let htmlString = "" // create empty string to concatenate in loop

                    // loop to create div elements with loaded data from API
                    for (i = 0; i < ourData.results.length; i++) {

                        htmlString += `<a href="${ourData.results[i].previewUrl}"><div class="search-item"><div class="image-box"><img src="${ourData.results[i].artworkUrl100}" alt="Image to this item" class="song-image"></div>`
                        htmlString += `<div class="song-info"><p class="song-title">${ourData.results[i].trackName}</p><p class="song-author">${ourData.results[i].artistName}</p></div></a></div>`
                    }

                    htmlString += `<div class="clear"></div>` // clear div because of float
                    title.insertAdjacentHTML('beforeend', htmlString); // insert complete variable to our div

                    // check condition if we have to create prev and next buttons
                    if (searchCounter > 9) {
                        document.querySelector(".prev-next").classList.add("prev-next-visible")
                    }; // make buttons visible if we need

                    // pagination with jQuery help
                    listener: $("#next-page").unbind("click");
                    listener: $("#previous-page").unbind("click"); // listeners to not duplicate jumps from prev-next buttons
                    let numberOfItems = $('.search-item').length; // total number of items that we want to paginate
                    let limitPerPage = 9; // condition contained in guideline - limit items per page
                    $('.search-item:gt(' + (limitPerPage - 1) + ')').hide(); // hide all items over page limit
                    let totalPages = Math.ceil(numberOfItems / limitPerPage); // total pages equal round out number

                    // create ul to get indexs from them and update our site in future (now it's hide)
                    $(".pagination").text(""); // innerHTML to not duplicate ul in second use function
                    // add prev button and first page number to our ul
                    $(".pagination").append("<li id='previousPage'><a href='javascript:void(0)'>" + "<<" + "</a></li>");
                    $(".pagination").append("<li class='current-page active'><a href='javascript:void(0)'>" + 1 + "</a></li>");
                    // loop to insert page numbers for each sets we nned equal to page limit
                    for (let i = 2; i <= totalPages; i++) {
                        $(".pagination").append("<li class='current-page'><a href='javascript:void(0)'>" + i + "</a></li>");
                    }
                    // add next button to our ul
                    $(".pagination").append("<li id='nextPage'><a href='javascript:void(0)' aria-label=Next><span aria-hidden=true>&raquo;</span></a></li>");

                    //changing active class on li (all list is hide for now)
                    $(".pagination li.current-page").on("click", function () {

                        if ($(this).hasClass('active')) {
                            return false;
                        } else {
                            let currentPage = $(this).index();
                            $(".pagination li").removeClass('active');
                            $(this).addClass('active');
                            $(".search-item").hide();
                            let grandTotal = limitPerPage * currentPage;
                            for (let i = grandTotal - limitPerPage; i < grandTotal; i++) {
                                $(".search-item:eq(" + i + ")").show();
                            }
                        }
                    });
                    // function to navigate users to the next page
                    $("#next-page").on("click", function () {

                        // get .index from active page
                        let currentPage = $(".pagination li.active").index();

                        if (currentPage === totalPages) { // check if it is possible to move next
                            return false;
                        } else {
                            currentPage++; // if we can, change active class to next li element
                            $(".pagination li").removeClass('active');
                            $(".search-item").hide();
                            let grandTotal = limitPerPage * currentPage;
                            // loop through total items, selecting a new set of items based on page number
                            for (let i = grandTotal - limitPerPage; i < grandTotal; i++) {
                                $(".search-item:eq(" + i + ")").show();
                            }
                            $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass('active');
                        }
                    });
                    // similar function to this function afore
                    $("#previous-page").on("click", function () {

                        let currentPage = $(".pagination li.active").index();

                        if (currentPage === 1) {
                            return false;
                        } else {
                            currentPage--;
                            $(".pagination li").removeClass('active');
                            $(".search-item").hide();
                            let grandTotal = limitPerPage * currentPage;

                            for (let i = grandTotal - limitPerPage; i < grandTotal; i++) {
                                $(".search-item:eq(" + i + ")").show();
                            }
                            $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass('active');
                        }
                    });
                };
                renderHTML(ourData);
            };
        };
        ourRequest.send();
    });
});
