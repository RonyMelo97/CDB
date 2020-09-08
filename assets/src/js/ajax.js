export default function Ajax() {
    this.get = (url) => {
        return fetch(url)
            .then(res => {
                return res.json();
            })
            .catch(err => {
                throw new Error('Não possível obter a resposta', err);
            });
    }

    this.post = (url, payload) => {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        return fetch(url, config)
            .then(res => {
                return res.json();
            })
            .catch(err => {
                throw new Error('Não possível obter a resposta', err);
            });
    }
}