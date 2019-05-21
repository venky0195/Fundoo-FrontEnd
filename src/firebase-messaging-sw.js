/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDc_mPx9wikhyPENjWG6vvpkR6LAXjvbMM",
  authDomain: "fundoo-notess.firebaseapp.com",
  databaseURL: "https://fundoo-notess.firebaseio.com",
  projectId: "fundoo-notess",
  storageBucket: "fundoo-notess.appspot.com",
  messagingSenderId: "183007367478"
});

const messaging = firebase.messaging();
messaging.onMessage(function(payload) {
  console.log("Message received. ", payload);
  // ...
});
