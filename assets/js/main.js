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
        if (inputControl.value == '') {
            inputG.classList.remove('focused');
            inputG.classList.remove('floating');
        } else {
            inputG.classList.remove('focused');
            inputG.classList.add('floating');
        }
    });

});

// Tabs Events

document.querySelectorAll('.tabs__tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        showTab(this.dataset.tab);
    });
});

function showTab(name) {
    document.querySelectorAll('.modal__content').forEach(function(content) {
        if (content.dataset.content == name) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    })

    document.querySelectorAll('.tabs__tab').forEach(function(aTab) {
        if (aTab.dataset.tab == name) {
            aTab.classList.add('selected');
        } else {
            aTab.classList.remove('selected');
        }
    })
}

function addTab(title, name, close = false) {
    var tabs = document.querySelector('.tabs');
    var currentTab = document.querySelector('.tabs__tab[data-tab=' + name + ']');

    if (!currentTab) {

        var tab = document.createElement('li');
        tab.classList.add('tabs__tab');
        tab.setAttribute('data-tab', name);
        tab.innerText = title;
        tab.addEventListener('click', function() {
            showTab(name);
        })

        /*         if (close) {
                    var closeBtn = document.createElement('button');
                    closeBtn.classList.add('tabs__tab__close');
                    closeBtn.innerText = 'X';

                    closeBtn.addEventListener('click', function() {
        							document.querySelector('.tabs__tab[data-tab=' + name + ']').remove();
                    });

                    tab.append(closeBtn);
                } */

        tabs.append(tab);

        showTab(name);
    }
}