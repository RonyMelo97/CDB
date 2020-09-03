import Ajax from '../ajax.js';

export default function Posts() {

    const ajax = new Ajax();

    ajax.get('https://viacep.com.br/ws/01001000/json/').then((data) => {

        const template = document.querySelector("[data-template='posts']").innerHTML;

        const donkey = Handlebars.compile(template);

        const compiled = donkey(data);
        document.querySelector('.posts-list').innerHTML = compiled;

    });

}