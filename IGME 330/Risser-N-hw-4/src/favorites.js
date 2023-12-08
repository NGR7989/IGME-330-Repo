import * as fire from "./firebase.js";

let valArr = [];

const favoritesChanged = (snapshot) => {

  snapshot.forEach(fav => {
    const childKey = fav.key;
    const childData = fav.val();
    valArr.push(fav);
  });

  // Sort array 
  valArr.sort((a, b) => b.val().likes - a.val().likes);
  displayUI();

};

const displayUI = () => {
  let html = "";
  console.log(valArr);

  let counter = 0;
  valArr.forEach( current => {
    counter++;
    html += `<dt> ${counter}) <b>${current.key}</b> likes: ${current.val().likes} </dt>`;
  });

  document.querySelector("#list").innerHTML = html;
}

const favoritesRef = fire.ref(fire.db, 'park-favorites/');
fire.onValue(favoritesRef, favoritesChanged);