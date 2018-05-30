const eventHandlers = {
    limit: 50, // max limit is 200
    callback: function doNothing() {},
    onKeyUp: function onKeyUp(event) {
        if (event.keyCode === 13) {
            eventHandlers.onSearch(eventHandlers.callback);
        };
    },

    onSearch: function onSearch() {
        const searchValue = document.querySelector(".page-search").value;
        ajax.request(`https://itunes.apple.com/search?term=${searchValue}&entily=song&limit=${eventHandlers.limit}`, eventHandlers.callback);
    }
};
