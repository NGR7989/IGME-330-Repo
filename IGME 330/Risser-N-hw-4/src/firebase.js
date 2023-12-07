import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from  "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6K02g8-Lggyi4chxeaGK0ngznudbw3eI",
    authDomain: "high-scores-d3d1e.firebaseapp.com",
    projectId: "high-scores-d3d1e",
    storageBucket: "high-scores-d3d1e.appspot.com",
    messagingSenderId: "1041354933139",
    appId: "1:1041354933139:web:381c858575e620b1005e66"
};


const writeUserData = (userId, favorites) => {
    const db = getDatabase();
    set(ref(db, "users/" + userId), {
        favorites: favorites
    });
    }
    
const writeHighScoreData2 = (userId, game, score) => {
    const db = getDatabase();
    set(ref(db, 'scores2/' + userId), {
    game,
    score
    });
};
	


const SetUpFireBase = () =>
{
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);	

    console.log(app); // make sure firebase is loaded

    let score = 0;
        
    // clickMeButton.onclick = _ => {
    // score++;
    // scoreElement.innerText = score;
    // };

    // saveScoreButton.onclick = _ => {
    //     writeHighScoreData2(nameField.value,"Clicktastic",score);
    // };
}


export {SetUpFireBase, writeUserData};