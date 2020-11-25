import Firebase from './firebase.js';
<<<<<<< HEAD
//images carousel
$('.carousel').slick({
    infinite:true,
    slidesToshow:1,
    dots:false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
});
//Responsive menu
const header__list = document.querySelector('.header__list')
const checkbox = document.querySelector('#checkbox-menu');
    checkbox.addEventListener("click",function(event){
        
        header__list.classList.toggle("open-menu")
    });
//header Search
const magnifying = document.querySelector('.header__magnifying');
const bars = document.querySelector('.hamburger-menu');
const search = document.querySelector('.header__search');
const items = document.querySelector('.header__items');
  if(search != null){
    search.addEventListener("focus",function(event){
        items.classList.add("open-search");
        checkbox.classList.remove('#checkbox-menu');
        bars.classList.add('close-menu');
        magnifying.classList.add('openMagnifying');
    });
    search.addEventListener ("focusout",function(event){
        items.classList.remove("open-search")
        bars.classList.remove('close-menu');
        magnifying.classList.remove('openMagnifying');
    }); 
  }
//Abrir e fechar Submenu
    const submenu = document.querySelector('.header__link--theme')
    const submenu__items = document.querySelectorAll(".header__items--submenu")
    const arrowDown = document.querySelector('.header__arrow-down')
    submenu.addEventListener('click',function(event){

        for (let i = 0; i < submenu__items.length; i++) {
            submenu__items[i].classList.toggle("open-submenu")
            
        }
       
            console.log(arrowDown);
            submenu.classList.toggle("header__arrow-up");     
    });
//Scroll suave
const aboutUS = document.querySelector('.header__link--anchor')  
aboutUS.addEventListener('click',function(event){
        window.scroll({top: 500, left: 0, behavior: 'smooth' })
    });
    
//Click no olho publications
const boxEye = document.querySelector('.crud__box-eye')
const FaEye = document.querySelector('.crud__eye-toggle')
const FaEyeSlash = document.querySelector('.crud__eye-slash-toggle')
console.log(boxEye);
    boxEye.addEventListener('click',function(event){
        console.log(boxEye);
        FaEye.classList.toggle("eye-active")
        FaEyeSlash.classList.toggle("eye-active")
    });
=======
>>>>>>> 901a4c7620d811fe5d8ac8f5b571133dad3bcc3a
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

// fetch('https://cannabisdb-4843e.firebaseio.com/posts?auth=' + config.apiKey + '').then(function(data) {
//     return data.json();
// }).then(function(data) {
//     console.log(data)
// })

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


function init() {

    getPosts().then(posts => {

        const source = document.getElementById('last-posts-template').innerHTML;
        const template = Handlebars.compile(source);
        const html = template({ posts: posts });

        document.getElementById('container-cards').innerHTML = html;
    });

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

// Login Form
if (els.forms.login) {
    els.forms.login.addEventListener('submit', function(ev) {
        ev.preventDefault();

        const email = this.querySelector('input[name="email"]').value;
        const password = this.querySelector('input[name="password"]').value;

        if (email == '' || password == '') {
            alert('Preencha todos os campos');
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
            alert('Preencha todos os campos');
        } else {
            fb.user.register(email, password);
        }

    });
}

// ############################################### // 

// DB References

function getData(path) {
    let db;

    if (typeof firebase.database === 'function') {
        db = firebase.database();
    } else {
        throw new Error('O arquivo para conexão com o banco não foi encontrado ou está corrompido.');
        return false;
    }

    return db.ref(path).once('value').then(snapshot => {
        return snapshot.val();
    })
}

function getPosts(args) {

    if (!args) {
        return getData('/posts').then(posts => {
            return posts;
        });
    }

    if (args) {
        if (args.id) {
            return getData(`/posts/${args.id}`).then(post => {
                return post;
            });
        }
    }

}