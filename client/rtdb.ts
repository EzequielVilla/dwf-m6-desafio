import firebase from "firebase";
firebase.initializeApp({
    apiKey: "bWPR0ZtgFpzWAy5Li2hIWwoB3K2lcREiMKwOAGQO",
    databaseURL: "https://dwf-m6-desafio-32ef6-default-rtdb.firebaseio.com/",
    authDomain: "dwf-m6-desafio-32ef6.firebaseapp.com",
    
});
const rtdb = firebase.database();
export {rtdb} 