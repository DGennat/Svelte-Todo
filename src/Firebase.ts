import { initializeApp } from "firebase/app";
// import { getAuth } from "Firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrdvdgdbMlEtl-1Cm2eKkTXZgJ2XfDJRI",
    authDomain: "svelte-todo-99ef0.firebaseapp.com",
    projectId: "svelte-todo-99ef0",
    storageBucket: "svelte-todo-99ef0.appspot.com",
    messagingSenderId: "406562755404",
    appId: "1:406562755404:web:f83dcd6fb22ecc250fb5e9"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

//   const auth = getAuth(app)

  export {
    // auth,
    app
}