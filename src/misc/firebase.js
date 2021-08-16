import { Notification as Toast } from "rsuite";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'
import 'firebase/functions'
import { isLocalhost } from "./helpers";

const config = {
    apiKey: "AIzaSyCQx1Zzc9AACKxOtHP0XqX413xPF8M9Dpo",
    authDomain: "chat-web-app-fc21c.firebaseapp.com",
    databaseURL: 'https://chat-web-app-fc21c-default-rtdb.firebaseio.com',
    projectId: "chat-web-app-fc21c",
    storageBucket: "chat-web-app-fc21c.appspot.com",
    messagingSenderId: "965480429814",
    appId: "1:965480429814:web:7af3aedfc656b9d763d4d7"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
export const functions = app.functions('europe-west3');

export const messaging = firebase.messaging.isSupported() ? app.messaging() : null;

if (messaging) {
    messaging.usePublicVapidKey('BEwVh3jBidis-5klomXiaKRMA3LJPPompZmyfbEsoiIFpYin_zQX3E8lahA8q0SCg8IgVZfx8003gF20W5CDjhk');

    messaging.onMessage(({ notification }) => {
        const { title, body } = notification;
        Toast.info({ title, description: body, duration: 0 })
    })
}

if (isLocalhost) {
    functions.useFunctionsEmulator('http://localhost:5001');
}