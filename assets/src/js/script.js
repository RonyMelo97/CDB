// Banner Carousel
$('.carousel').slick({
    infinite: true,
    slidesToshow: 1,
    dots: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
});

// Elements
const els = {
    search: document.querySelector('.header__search'),
    header: {
        items: document.querySelector('.header__items'),
        open: document.querySelector('.header__open'),
        list: document.querySelector('.header__list'),
        login: document.querySelector('.header__btn-default--logIn')
    },
    menu: {
        bars: document.querySelector('.hamburger-menu'),
        checkbox: document.querySelector('#checkbox-menu')
    },
    submenu: {
        self: document.querySelector('.header__link--theme'),
        items: document.querySelectorAll('.header__items--submenu')
    },
    anchor: document.querySelector('.header__link--anchor')
};

// Handle Responsive Menu
els.menu.checkbox.addEventListener("click", () => {
    els.header.list.classList.toggle("open-menu");
});


// Els to handle search
const search = els.search,
    items = els.header.items,
    checkbox = els.menu.checkbox,
    bars = els.menu.bars,
    headerOpen = els.header.open

// Handle Search
if (search !== null) {
    search.addEventListener("focus", () => {
        items.classList.add("open-search");
        checkbox.classList.remove('#checkbox-menu');
        bars.classList.add('close-menu');
        headerOpen.classList.add('open');
    });

    search.addEventListener("focusout", () => {
        items.classList.remove("open-search");
        bars.classList.remove('close-menu');
        headerOpen.classList.remove('open');
    });
}


// Els to handle submenu
if (els.submenu.self) {
    const submenu = els.submenu.self;

    // Handle submenu
    submenu.addEventListener('click', () => {

        for (let item of els.submenu.items) {
            item.classList.toggle("open-submenu");
        }

        submenu.classList.toggle("submenu-opened");
    });
}

// Smooth Scroll
if (els.anchor) {
    els.anchor.addEventListener('click', (event) => {
        const target = event.target,
            el = target.dataset.target;

        el.scrollIntoView({ behavior: 'smooth' })
    });
}

els.header.login.addEventListener('click', () => {
    document.querySelector('.modal--tabs').classList.add('open');
    document.querySelector('.overlay').classList.add('visible');
});

document.querySelector('.overlay').addEventListener('click', () => {
    document.querySelector('.modal--tabs').classList.remove('open');
    document.querySelector('.overlay').classList.remove('visible');
})

//Click no olho publications
const boxEye = document.querySelector('.crud__box-eye')
const FaEye = document.querySelector('.crud__eye-toggle')
const FaEyeSlash = document.querySelector('.crud__eye-slash-toggle')

if (boxEye) {
    boxEye.addEventListener('click', function(event) {
        FaEye.classList.toggle("eye-active")
        FaEyeSlash.classList.toggle("eye-active")
    });
}
// Connection