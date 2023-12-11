import "./style.css";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {} from "firebase/auth";
// import { } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyChMH8UwkuT1sGWFU6hIFItPKH3StRBmLg",
  authDomain: "simple-server-game.firebaseapp.com",
  databaseURL: "https://simple-server-game-default-rtdb.firebaseio.com",
  projectId: "simple-server-game",
  storageBucket: "simple-server-game.appspot.com",
  messagingSenderId: "664777792190",
  appId: "1:664777792190:web:4492b2c92154d781a81cef",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("test");

/*
class basicClass {
  constructor(readonly maxHealth: number, readonly attack: number) {}
}
*/

(function () {
  let thisPlayerId: string;
  let thisPlayerRef: firebase.database.Reference;
  //let players = {};

  let bossRef: firebase.database.Reference;
  let bossData = { health: 0 };

  const playerActionButton = document.querySelector("#action1")!;

  playerActionButton.addEventListener("click", () => {
    bossData.health -= 100;
    bossRef.update({
      health: bossData.health,
    });
    console.log(bossData.health);
  });

  function setBoss() {
    bossRef = firebase.database().ref(`boss`);
    get(bossRef.child("/health")).then((snapshot) => {
      bossData.health = snapshot.val();
      if (bossData.health <= 0) {
        console.log(snapshot.val());
        bossRef.set({
          health: 1000,
        });
      }
    });

    bossRef.on("value", (snapshot) => {
      bossData.health = snapshot.child("health").val();
      if (bossData.health < 0) {
        bossRef.set({
          health: 1000,
        });
      }
    });
  }

  /*
  function initGame() {
    const allPlayersRef = firebase.database().ref(`players`);

    allPlayersRef.on("value", (snapshot) => {
      players = snapshot.val() || {};
    });

    allPlayersRef.on("child_added", (snapshot) => {
      const addedPlayer = snapshot.val();
    });

    allPlayersRef.on("child_removed", (snapshot) => {
      const removedKey = snapshot.val().id;
    });
  }
  */

  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      thisPlayerId = user.uid;
      thisPlayerRef = firebase.database().ref(`players/${thisPlayerId}`);

      thisPlayerRef.set({
        id: thisPlayerId,
        class: "temp",
        health: 100,
      });

      thisPlayerRef.onDisconnect().remove();
    } else {
    }
  });

  firebase
    .auth()
    .signInAnonymously()
    .catch((error) => {
      console.log(error.code, error.message);
    });

  setBoss();
})();
