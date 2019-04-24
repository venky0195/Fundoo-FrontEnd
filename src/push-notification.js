import * as firebase from "firebase";
import { pushNotification } from "./services/noteServices";
export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyDc_mPx9wikhyPENjWG6vvpkR6LAXjvbMM",
    authDomain: "fundoo-notess.firebaseapp.com",
    databaseURL: "https://fundoo-notess.firebaseio.com",
    projectId: "fundoo-notess",
    storageBucket: "fundoo-notess.appspot.com",
    messagingSenderId: "183007367478"
  });
  // use other service worker
  // navigator.serviceWorker.register("/my-sw.js").then(registration => {
  //   firebase.messaging().useServiceWorker(registration);
  // });
};

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("FireBase token is:", token);
    localStorage.setItem("pushToken", token);
    var data={
      pushToken: token,
      userId: localStorage.getItem("user_id")
    }
    pushNotification(data)
    return token;
    
  } catch (error) {
    console.error(error);
  }
};


export const deletePushToken = async () => {
  try {
    const messaging = firebase.messaging();
    const token = await messaging.getToken();
    await messaging.deleteToken(token);
  } catch (error) {
    console.error(error);
  }
};
