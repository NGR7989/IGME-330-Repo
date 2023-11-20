const downloadFile = (url, callbackRef) => {
    const xhr = new XMLHttpRequest();

    // Set onerror handler
    xhr.onerror = (e) => console.log("error");

    // Set onload handler
    xhr.onload = (e: Event) => {

        if(e.target == null)
            return;

        const headers = (e.target as XMLHttpRequest).getAllResponseHeaders();
        const jsonString = (e.target as XMLHttpRequest).response;
        console.log(`headers = ${headers}`);
        console.log(`jsonString = ${jsonString}`);
        callbackRef(jsonString);
    } // end of xhr.onload

    // open connection using the http GET method
    xhr.open("GET", url);

    xhr.send();
}

export{downloadFile};