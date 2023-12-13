import "./style.css";
import * as classData from "./classes";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {} from "firebase/auth";
// import { } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { get, push } from "firebase/database";

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

function getRandomClass(): string {
  const randClass = Math.floor(classData.classList.length * Math.random());
  return classData.classList[randClass];
}

(function () {
  let thisPlayerId: string;
  let thisPlayerRef: firebase.database.Reference;
  let thisPlayerClass = classData.getClassFromString(getRandomClass());
  let thisPlayerData = {
    health: thisPlayerClass.health,
    attack: thisPlayerClass.attack,
  };
  console.log(thisPlayerClass.name);
  //let players = {};

  let bossRef: firebase.database.Reference;
  let bossData = { health: 0, cooldown: 0 };

  let playerAttacksRef: firebase.database.Reference;

  function damageBoss(amount: number, cd: number = 1) {
    bossData.health -= amount;
    bossData.cooldown -= cd;
    bossRef.update({
      health: bossData.health,
      cooldown: bossData.cooldown,
    });
  }

  function damagePlayer(amount: number) {
    thisPlayerData.health -= amount;
    window.dispatchEvent(UIChangedEvent);
  }

  function healPlayer(amount: number) {
    thisPlayerData.health += amount;

    if (thisPlayerData.health > thisPlayerClass.health) {
      thisPlayerData.health = thisPlayerClass.health;
    }

    window.dispatchEvent(UIChangedEvent);
  }

  const playerAttackButton = document.querySelector("#attack")!;
  playerAttackButton.addEventListener("click", () => {
    damageBoss(thisPlayerData.attack);
  });

  const playerRecoverButton = document.querySelector("#recover")!;
  playerRecoverButton.addEventListener("click", () => {
    if (thisPlayerData.health < thisPlayerClass.health) {
      const recoveryAmount = Math.floor(thisPlayerClass.health / 10);
      healPlayer(recoveryAmount);
    }

    damageBoss(0);
  });

  const playerSkill1Button = document.querySelector("#skill1")!;
  playerSkill1Button.addEventListener("click", () => {
    parseSkillData(thisPlayerClass.skill1());
  });

  const playerSkill2Button = document.querySelector("#skill2")!;
  playerSkill2Button.addEventListener("click", () => {
    parseSkillData(thisPlayerClass.skill2());
  });

  const UIChangedEvent: Event = new Event("ui-changed");

  window.addEventListener("ui-changed", () => {
    updatePlayerUI();
    updateBossUI();
  });

  function updatePlayerUI() {
    const playerUI = document.getElementById("player")!;
    playerUI.innerHTML = `<strong>Your Health:</strong> ${thisPlayerData.health}`;
  }

  function updateBossUI() {
    const bossUI = document.getElementById("boss")!;
    bossUI.innerHTML = `<strong>Boss Health:</strong> ${bossData.health}`;
  }

  function setBoss() {
    bossRef = firebase.database().ref(`boss`);

    get(bossRef.child("/health")).then((snapshot) => {
      bossData.health = snapshot.val();
      if (bossData.health <= 0) {
        bossRef.set({
          health: 1000,
          cooldown: 10,
        });
      }
    });

    bossRef.on("value", (snapshot) => {
      bossData.health = snapshot.child("health").val();
      if (bossData.health < 0) {
        bossRef.update({
          health: 1000,
        });
      }

      bossData.cooldown = snapshot.child("cooldown").val();
      if (bossData.cooldown <= 0) {
        damagePlayer(10);
        bossRef.update({
          cooldown: 10,
        });
      }

      window.dispatchEvent(UIChangedEvent);
    });
  }

  function resolveTargetAndEffects(
    target: string,
    effect: string,
    value: number
  ) {
    if (target == "boss") {
      if (effect == "damage") {
        damageBoss(value);
      } else if (effect == "heal") {
        damageBoss(-1 * value);
      }
    } else if (target == "self") {
      if (effect == "damage") {
        damagePlayer(value);
      } else if (effect == "heal") {
        healPlayer(value);
      }
    } else if (target == "allies") {
      pushPlayerAttack(effect, value);
    }
  }

  function parseSkillData(data: classData.SkillData) {
    resolveTargetAndEffects(data.target1, data.effect1, data.value1);
    resolveTargetAndEffects(data.target2, data.effect2, data.value2);
  }

  function pushPlayerAttack(type: string, value: number) {
    const attackRef = firebase.database().ref(`playerAttacks/attacks`);
    if (thisPlayerId) {
      push(attackRef, [thisPlayerId, type, value]);
    }
  }

  function parseOtherPlayerAttack(data: [string, string, number]) {
    if (data[0] != thisPlayerId) {
      console.log(data);
      if (data[1] == "damage") {
        damagePlayer(data[2]);
      } else if (data[1] == "heal") {
        healPlayer(data[2]);
      } else if (data[1] == "set") {
        thisPlayerData.health = data[2];
      }
    }
  }

  function setPlayers() {
    playerAttacksRef = firebase.database().ref(`playerAttacks`);
    playerAttacksRef.set({
      attacks: [],
    });

    const attackRef = firebase.database().ref(`playerAttacks/attacks`);
    attackRef.on("child_added", (snapshot) => {
      parseOtherPlayerAttack(snapshot.val());
      console.log(thisPlayerData.health);
      snapshot.ref.remove();
      window.dispatchEvent(UIChangedEvent);
    });
  }

  function initGame() {
    setBoss();
    setPlayers();
  }

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

  initGame();
})();
