import Ajax from '../ajax.js';

export default function Posts() {

    const ajax = new Ajax();

    return ajax.get('https://cannabisdb-4843e.firebaseio.com/posts.json').then(data => {

        const template = document.querySelector("[data-template='posts']").innerHTML;
        const donkey = Handlebars.compile(template);

        const handleData = {
            posts: data
        };

        const compiled = donkey(handleData);

        document.querySelector('.posts-list').innerHTML = compiled;
    });

}