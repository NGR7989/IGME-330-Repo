import * as fire from "./firebase.js";

const favoritesChanged = (snapshot) => {
    // TODO: clear #favoritesList
    snapshot.forEach(fav => {
      const childKey = fav.key;
      const childData = fav.val();
      console.log(childKey,childData);
      // TODO: update #favoritesList
    });
  };

const favoritesRef = fire.ref(fire.db, 'park-favorites/');
fire.onValue(favoritesRef, favoritesChanged);