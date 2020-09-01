// Firebase config

var firebaseConfig = {
    apiKey: "AIzaSyCljnwFf_YOnEflIaBhS_n9nP1nf3cft4o",
    authDomain: "cannabisdb-4843e.firebaseapp.com",
    databaseURL: "https://cannabisdb-4843e.firebaseio.com",
    projectId: "cannabisdb-4843e",
    storageBucket: "cannabisdb-4843e.appspot.com",
    messagingSenderId: "723480522711",
    appId: "1:723480522711:web:b061ccfd9ca88446b32592",
    measurementId: "G-5RF95DX7F1"
};

// Firebase init

firebase.initializeApp(firebaseConfig);

// Firebase auth

firebase.auth().createUserWithEmailAndPassword('teste@teste.com', 'password').then(function(user) {
    console.log('Usuário criado', user);
}).catch(function(error) {
    console.log('Erro:' + error.code + ' - ' + error.message);
})