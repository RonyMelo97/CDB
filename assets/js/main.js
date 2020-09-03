import Firebase from './firebase.js';

// Connection
const config = {
    apiKey: "AIzaSyCljnwFf_YOnEflIaBhS_n9nP1nf3cft4o",
    authDomain: "cannabisdb-4843e.firebaseapp.com",
    databaseURL: "https://cannabisdb-4843e.firebaseio.com",
    projectId: "cannabisdb-4843e",
    storageBucket: "cannabisdb-4843e.appspot.com",
    messagingSenderId: "723480522711",
    appId: "1:723480522711:web:b061ccfd9ca88446b32592",
    measurementId: "G-5RF95DX7F1"
};

const fb = new Firebase(config);


// Input Events
for (let group of document.querySelectorAll('.input-group')) {

    const inputControl = group.querySelector('.input-control');
    const labelControl = group.querySelector('.label-control');

    labelControl.addEventListener('click', () => {
        inputControl.focus();
    });

    inputControl.addEventListener('focus', () => {
        group.classList.add('focused');
    });

    inputControl.addEventListener('blur', () => {
        if (inputControl.value == '') {
            group.classList.remove('focused');
            group.classList.remove('floating');
        } else {
            group.classList.remove('focused');
            group.classList.add('floating');
        }
    });

};

// Tabs Events

for (let tab of document.querySelectorAll('.tabs__tab')) {
    tab.addEventListener('click', function() {
        showTab(this.dataset.tab);
    });
};

function showTab(name) {
    for (let content of document.querySelectorAll('.modal__content')) {
        if (content.dataset.content == name) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    }

    for (let tab of document.querySelectorAll('.tabs__tab')) {
        if (tab.dataset.tab == name) {
            tab.classList.add('selected');
        } else {
            tab.classList.remove('selected');
        }
    }
}

function addTab(title, name, close = false) {
    const tabs = document.querySelector('.tabs');
    const currentTab = document.querySelector('.tabs__tab[data-tab=' + name + ']');

    if (!currentTab) {

        const tab = document.createElement('li');
        tab.classList.add('tabs__tab');
        tab.setAttribute('data-tab', name);
        tab.innerText = title;
        tab.addEventListener('click', function() {
            showTab(name);
        })

        /*         if (close) {
                    const closeBtn = document.createElement('button');
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

// Login Form

document.querySelector('.login-form').addEventListener('submit', function(ev) {
    ev.preventDefault();

    const email = this.querySelector('input[name="email"]').value;
    const password = this.querySelector('input[name="password"]').value;

    if (email == '' || password == '') {
        alert('Preencha todos os campos');
    } else {
        fb.user.login(email, password);
    }

});

// Register Form

document.querySelector('.register-form').addEventListener('submit', ev => {
    ev.preventDefault();

    if (name == '' && email == '' && password == '' && confirmPassword == '') {
        alert('Preencha todos os campos');
    } else {
        fb.user.register(email, password);
    }

});