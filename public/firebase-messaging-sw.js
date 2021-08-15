/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCQx1Zzc9AACKxOtHP0XqX413xPF8M9Dpo",
    authDomain: "chat-web-app-fc21c.firebaseapp.com",
    databaseURL: 'https://chat-web-app-fc21c-default-rtdb.firebaseio.com',
    projectId: "chat-web-app-fc21c",
    storageBucket: "chat-web-app-fc21c.appspot.com",
    messagingSenderId: "965480429814",
    appId: "1:965480429814:web:7af3aedfc656b9d763d4d7"
});

firebase.messaging();