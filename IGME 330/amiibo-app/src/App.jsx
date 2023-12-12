import { useState } from "react";
import './App.css'

// app "globals" and utils
const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";


const displayResults = (results) => {

  
  results.map(amiibo => (
    <span key={amiibo.head + amiibo.tail} style={{color:"green"}}>
      <h4>{amiibo.name}</h4>
      <img 
        width="100" 
        alt={amiibo.character}
        src={amiibo.image}
      />
    </span>
  ))

  console.log(results);
  //document.querySelector("#results") = values;
}

const loadXHR = (url, callback) => {
  // set up the connection
  // when the data loads, invoke the callback function and pass it the `xhr` object

  const xhr = new XMLHttpRequest();
  xhr.onload = (e) =>
  {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);
    //let json = e.target.responseText;
    console.log(url);
    callback(e.target);
  };

  xhr.open("GET", url);
  xhr.send();
};

const searchAmiibo = (name, callback) => {
  loadXHR( `${baseurl}${name}`, callback);
};

const parseAmiiboResult = xhr => {
  
  // get the `.responseText` string
  let response = xhr.responseText; 

  // declare a json variable
  let json;
 
  // try to parse the string into a json object
  json = JSON.parse(response);

  // log out number of results (length of `json.amiibo`)
  console.log(`Number of results=${json.amiibo.length}`);
  
  // loop through `json.amiibo` and log out the character name
  json.amiibo.forEach((element) => console.log(element));

  displayResults(json.amiibo);
  
};

const App = () => {
  return <>
    <header>
      <h1>Amiibo Finder</h1>
    </header>
    <hr />
    <main>
      <button>Search</button>
      <label>
        Name: 
        <input />
      </label>
      <div id="results"></div>
    </main>
    <hr />
    <footer>
      <p>&copy; 2023 Ace Coder</p>
    </footer>
  </>;
};


  // call searchAmiibo() with "mario" and our callback function
  searchAmiibo("mario", parseAmiiboResult); // DONE

export default App;