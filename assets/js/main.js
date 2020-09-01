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

// firebase.auth().createUserWithEmailAndPassword('teste@teste.com', 'password').then(function(user) {
//     console.log('Usuário criado', user);
// }).catch(function(error) {
//     console.log('Erro:' + error.code + ' - ' + error.message);
// })

// Input Events

document.querySelectorAll('.input-group').forEach(function(inputG) {

    var inputControl = inputG.querySelector('.input-control');
    var labelControl = inputG.querySelector('.label-control');

    labelControl.addEventListener('click', function() {
        inputControl.focus();
    })

    inputControl.addEventListener('focus', function() {
        inputG.classList.add('focused');
    });

    inputControl.addEventListener('blur', function() {
        inputG.classList.remove('focused');
    });

});

// Tabs Events

document.querySelectorAll('.tabs__tab').forEach(function(tab) {
    tab.addEventListener('click', function() {

        var tabName = this.dataset.tab;

        document.querySelectorAll('.modal__content').forEach(function(content) {
            if (content.dataset.content == tabName) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        })

        document.querySelectorAll('.tabs__tab').forEach(function(aTab) {
            if (aTab.dataset.tab == tabName) {
                aTab.classList.add('selected');
            } else {
                aTab.classList.remove('selected');
            }
        })
    });
});

function addTab(title, tab, close = false) {
    var tabs = document.querySelector('.tabs');

    var tab = document.createElement('li');
    tab.classList.add('tabs__tab');
    tab.setAttribute('data-tab', tab);
    tab.innerText = title;

    if (close) {
        var closeBtn = document.createElement('button');

        closeBtn.addEventListener('click', function() {
            console.log('remove')
        });
    }

    tabs.append();
}