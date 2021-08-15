/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chat-web-app-fc21c-default-rtdb.firebaseio.com",
});

const { sendFcm } = require("./src/fcm");

exports.sendFcm = sendFcm;
