import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyAPQrSf3Q7pRL1SNS4DHgKeOONuBakqrz8",
  authDomain: "tictactoe-c0044.firebaseapp.com",
  projectId: "tictactoe-c0044",
  storageBucket: "tictactoe-c0044.appspot.com",
  messagingSenderId: "98300889590",
  appId: "1:98300889590:web:43f71875343a0454295fd7",
  measurementId: "G-ERSW301PZW"
  };

  const Fire = firebase.initializeApp(firebaseConfig);

  export default Fire;