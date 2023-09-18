import { randElement } from "./utils.js";
let words1 = "";
let words2 = "";
let words3 = "";

const loadJson = () =>
{
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) =>
    {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const text = e.target.responseText;
        let json = JSON.parse(text);
        
        words1 = json["words1"];
        words2 = json["words2"];
        words3 = json["words3"];

        // Initial display after loaded 
        displayBabble(1);
    }

    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}


const displayBabble = (num) =>
{
    let babble = "<ol>";
    for(let i = 0; i < num; i++)
    {
        babble += `<li>${randElement(words1)} ${randElement(words2)} ${randElement(words3)}</li>`;
    }
    babble += "</ol>";

    document.querySelector("#output").innerHTML = babble;
}



// Create starting technobabble 
loadJson();

// Add button functionality 
document.querySelector("#myButton").onclick = () => displayBabble(1);
document.querySelector("#five-tech").onclick = () => displayBabble(5);

