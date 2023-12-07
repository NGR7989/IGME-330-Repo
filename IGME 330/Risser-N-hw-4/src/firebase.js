import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue, increment } from  "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6K02g8-Lggyi4chxeaGK0ngznudbw3eI",
    authDomain: "high-scores-d3d1e.firebaseapp.com",
    projectId: "high-scores-d3d1e",
    storageBucket: "high-scores-d3d1e.appspot.com",
    messagingSenderId: "1041354933139",
    appId: "1:1041354933139:web:381c858575e620b1005e66"
};


const writeUserDataInc = (favorite) => {
    set(ref(db, `park-favorites/${favorite}`), {
        likes: increment(1)
    });
}

const writeUserDataDec = ( favorite) => {
    set(ref(db, `park-favorites/${favorite}`), {
        likes: increment(-1)
    });
}

const readUserData = (locationID) => {
    //return get(ref(db, `users/ ${locationID}`));
}
	
const SetUpFireBase = () =>
{
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);	
    console.log(app); // make sure firebase is loaded


}

SetUpFireBase();
const db = getDatabase();

export {SetUpFireBase, writeUserDataInc, writeUserDataDec, readUserData, onValue, ref, db};