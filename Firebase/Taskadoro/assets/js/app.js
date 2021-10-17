// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBp4m3gJntAtP6VibZRVVCz_NufLq5TvI",
  authDomain: "taskadoro.firebaseapp.com",
  projectId: "taskadoro",
  storageBucket: "taskadoro.appspot.com",
  messagingSenderId: "415252558576",
  appId: "1:415252558576:web:55e9360fd77b73ff1c4835"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

// ***********************************************

// DOM variables
const spanDate = document.getElementById("date");
const spanMonth = document.getElementById("month");
const spanYear = document.getElementById("year");
const spanWeekday = document.getElementById("weekday");
const timer = document.getElementById("timer")

window.loadBody = function loadBody() {
    console.log('body is loaded');
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const myDate = date.getDate();
    const year = date.getFullYear();
    const day = date.toLocaleDateString('default', { weekday: 'long' });
    timer.innerHTML = date.toLocaleTimeString();

    spanWeekday.innerText = day + ", ";
    spanMonth.innerText = month;
    spanYear.innerText = year;
    spanDate.innerText = myDate + ", ";
}

window.startClock = function startClock(seconds) {
    console.log(`${seconds} seconds has passed`)
}