import Firebase from './firebase.js';
import Toaster from './toaster.js';

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
const toast = new Toaster();
// Elements

const els = {
    inputs: {
        group: document.querySelectorAll('.input-group')
    },
    forms: {
        login: document.querySelector('.login-form'),
        register: document.querySelector('.register-form')
    }
}

// Handle Document Ready

window.onload = () => {
    init();

    for (let group of els.inputs.group) {
        let value = group.querySelector('.input-control').value;

        if (value !== null && value !== '') {
            group.classList.add('floating');
        }
    }
};


async function init() {
    const page = window.location.pathname;

    switch (page) {
        case '/':
        case '/index.html':
            await getPosts().then(posts => {

                const source = document.getElementById('posts-template').innerHTML;
                const template = Handlebars.compile(source);
                const html = template({ posts: posts });

                document.getElementById('container-cards').innerHTML = html;
            });
            break;

        case '/post.html':
            let id = window.location.search.split('=');
            id = id[1];

            await getPosts({ id: id }).then(post => {
                const source = document.getElementById('post-template').innerHTML;
                const template = Handlebars.compile(source);
                const html = template(post);

                document.getElementById('container-posts').innerHTML = html;

                document.getElementById('container-title').innerText = post.title;
            });
            break;

        case '/new-post.html':
        case '/publications.html':
        case '/home-system.html':

            if (!validAccount()) {
                document.querySelector('main.container').innerHTML = '<center>Você não tem permissão para acessar esta página.</center>';
            }

            if (page === '/publications.html') {
                await getPosts().then(posts => {

                    const source = document.getElementById('posts-template').innerHTML;
                    const template = Handlebars.compile(source);
                    const html = template({ posts: posts });

                    document.getElementById('container-posts').innerHTML = html;
                });
            }


            break;
        default:
            break;
    }

    document.querySelector('.preload').classList.add('loaded');

}

// Input Events 
for (let group of els.inputs.group) {

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
        tab.addEventListener('click', () => {
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

function validAccount() {
    const email = window.localStorage.getItem('user');

    if (email) {

        if (
            email === 'faculdade@gabrieldeveloper.com'
        ) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }
}

// Login Form
if (els.forms.login) {
    els.forms.login.addEventListener('submit', function(ev) {
        ev.preventDefault();

        const email = this.querySelector('input[name="email"]').value;
        const password = this.querySelector('input[name="password"]').value;

        if (email == '' || password == '') {
            toast.show('error', 'Preencha todos os campos');
        } else {
            fb.user.login(email, password);
        }
    });
}

// Register Form
if (els.forms.register) {
    els.forms.register.addEventListener('submit', function(ev) {
        ev.preventDefault();

        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const password = this.querySelector('input[name="password"]').value;
        const confirmPassword = this.querySelector('input[name="confirm-password"]').value;

        if (name == '' && email == '' && password == '' && confirmPassword == '') {
            toast.show('error', 'Preencha todos os campos');
        } else {
            fb.user.register(email, password);
        }

    });
}

// ############################################### // 

// DB References
let db;
if (typeof firebase.database === 'function') {
    db = firebase.database();
} else {
    throw new Error('O arquivo para conexão com o banco não foi encontrado ou está corrompido.');
}

function getPosts(args) {

    if (!args) {
        return db.ref('/posts').once('value').then(snapshot => {
            return snapshot.val();
        })
    }

    if (args) {
        if (args.id) {
            return db.ref(`/posts/${args.id}`).once('value').then(snapshot => {
                return snapshot.val();
            })
        }

        if (args.limit) {
            return db.ref('/posts').limitToFirst(args.limit).once('value').then(snapshot => {
                return snapshot.val();
            });
        }
    }

}