import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBbZhbzmntKcSk999cyzwalmdwISJspi0w',
  authDomain: 'chat-web-app-b7ea9.firebaseapp.com',
  databaseURL: 'https://chat-web-app-b7ea9-default-rtdb.firebaseio.com',
  projectId: 'chat-web-app-b7ea9',
  storageBucket: 'chat-web-app-b7ea9.appspot.com',
  messagingSenderId: '921761500075',
  appId: '1:921761500075:web:6533ff4f3362bd4ca7e0ee',
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
