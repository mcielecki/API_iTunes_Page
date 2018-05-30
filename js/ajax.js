const ajax = {

    request: function request(url, callback) {
        document.querySelector(".loaderCont").classList.add("visible");
        document.querySelector(".page-instruction").classList.add("reset");

        const ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', url);

        ourRequest.onload = function () {
            const ourData = JSON.parse(ourRequest.responseText);
            callback(ourData);
            document.querySelector(".loaderCont").classList.remove("visible");
            document.querySelector(".page-instruction").classList.remove("reset");
        };

        ourRequest.send();
    }
};
