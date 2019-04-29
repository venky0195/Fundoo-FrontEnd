import * as firebase from "firebase";
import { pushNotification } from "./services/noteServices";
import {getNotif} from "./components/DisplayNotes"
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "183007367478"
  });
  // use other service worker
  navigator.serviceWorker.register("../public/firebase-messaging-sw.js").then(registration => {
    firebase.messaging().useServiceWorker(registration);
  });
};

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("FireBase token is:", token);
    localStorage.setItem("pushToken", token);
    var data = {
      pushToken: token,
      userId: localStorage.getItem("user_id")
    };
    pushNotification(data);
    messaging.onMessage(function(payload) {
      getNotif(payload)
      console.log('Message received. ', payload);
    });
  } catch (error) {
    console.error(error);
  }
};

export const deletePushToken = async () => {
  try {
    const messaging = firebase.messaging();
    const token = await messaging.getToken();
    
    await messaging.deleteToken(token);
    // var data = {
    //   pushToken: "",
    //   useriId: localStorage.getItem("user_id")
    // }
    // pushNotification(data);
  } catch (error) {
    console.error(error);
  }
};
