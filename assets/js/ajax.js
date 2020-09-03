export default function Ajax() {}

Ajax.prototype.get = (url) => {
    return fetch(url)
        .then(res => {
            return res.json();
        })
        .catch(err => {
            throw new Error('Não possível obter a resposta', err);
        });
}