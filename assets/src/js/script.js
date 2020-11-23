//images carousel
$('.carousel').slick({
    infinite: true,
    slidesToshow: 1,
    dots: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
});

//Responsive menu
const headerList = document.querySelector('.header__list');
const checkbox = document.querySelector('#checkbox-menu');

checkbox.addEventListener("click", () => {
    headerList.classList.toggle("open-menu");
});

//header Search
const magnifying = document.querySelector('.header__magnifying');
const bars = document.querySelector('.hamburger-menu');
const search = document.querySelector('.header__search');
const items = document.querySelector('.header__items');

search.addEventListener("focus", () => {
    items.classList.add("open-search");
    checkbox.classList.remove('#checkbox-menu');
    bars.classList.add('close-menu');
    magnifying.classList.add('open');
});

search.addEventListener("focusout", () => {
    items.classList.remove("open-search");
    bars.classList.remove('close-menu');
    magnifying.classList.remove('open');
});



const submenu = document.querySelector('.header__link--theme');
const submenuItems = document.querySelectorAll(".header__items--submenu");

submenu.addEventListener('click', () => {

    for (let item of submenuItems) {
        item.classList.toggle("open-submenu");
    }

    submenu.classList.toggle("submenu-opened");
});

//Scroll suave
const aboutUS = document.querySelector('.header__link--anchor');
aboutUS.addEventListener('click', () => {
    window.scroll({ top: 500, left: 0, behavior: 'smooth' })
});