import Vue from "vue";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "./firebase.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKYWVcMOaj5xxLQHj7XMuIln_X9UeHzuw",
  authDomain: "search-osusume.firebaseapp.com",
  projectId: "search-osusume",
  storageBucket: "search-osusume.appspot.com",
  messagingSenderId: "605574738049",
  appId: "1:605574738049:web:23fa7e529ed8bd22739d80",
  measurementId: "G-F0H1HHVVYJ",
};

firebase.initializeApp(firebaseConfig);

export const functions = firebase.functions();
/**
 * Vue.observable を使って、firebase.auth()をVueアプリ全体に共有する。
 * this.$authがアプリ全体でアクセスできる様になる。
 * @example
 * firebase.auth().currentUser.displayにアクセスする例。任意のコンポーネントで以下の様に記述できる。
 * ```js
 * this.$auth.currentUser.displayName // "displayName" or ""
 * ```
 */

const initialUserState = {
  id: "",
  mame: "",
  UserImage: "",
};
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
});
firebase.auth().onAuthStateChanged((user) => {
  let state;
  if (user) {
    const { id, name, UserImage } = user;
    state = {
      id,
      name,
      UserImage,
    };
  } else {
    state = initialUserState;
  }
  Object.assign($auth.currentUser, state);
});
Vue.prototype.$auth = $auth;
