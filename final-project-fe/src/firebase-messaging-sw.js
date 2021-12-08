importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

  var firebaseConfig = {

    apiKey: "AIzaSyCazBDxPyQoWFvMZZ9Pu0FINMfmNegtlzA",
    authDomain: "ts-restaurant.firebaseapp.com",
    projectId: "ts-restaurant",
    storageBucket: "ts-restaurant.appspot.com",
    messagingSenderId: "517064272876",
    appId: "1:517064272876:web:f891a80e95ec568d466ec9",
    measurementId: "G-6ZC0D7EH71"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();