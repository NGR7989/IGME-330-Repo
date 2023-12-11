const downloadFile = (url, callbackRef) => {
    const xhr = new XMLHttpRequest();

    // Set onerror handler
    xhr.onerror = (e) => console.log("error");

    // Set onload handler
    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        callbackRef(jsonString);
    } // end of xhr.onload

    // open connection using the http GET method
    xhr.open("GET", url);

    xhr.send();
}

export{downloadFile};