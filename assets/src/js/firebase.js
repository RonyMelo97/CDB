import Toaster from './toaster.js';
import Ajax from './ajax.js';

export default function Firebase(config) {

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    function handleError(code) {
        let message;

        switch (code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                message = 'Email ou senha incorretos';
                // message = 'Usuário não encontrado';
                // break;
                // message = 'Senha incorreta';
                break;
            case 'auth/weak-password':
                message = 'A senha deve conter no mínimo 6 caracteres';
                break;
            case 'email-already-in-use':
                message = 'Email em uso';
                break;
            default:
                break;
        }

        return message;
    }

    function refreshToken(token) {
        const payload = {
            grant_type: "refresh_token",
            refresh_token: token
        }

        return ajax.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCljnwFf_YOnEflIaBhS_n9nP1nf3cft4o', payload).then(function(data) {
            console.log(data);
            return data.id_token;
        });
    }

    const toast = new Toaster();
    const ajax = new Ajax();

    this.user = {

        register: (email, password) => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {

                toast.show('success', 'Usuário registrado com sucesso!');

            }).catch(function(error) {

                toast.show('error', handleError(error.code));

            })
        },
        login: (email, password) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then(data => {

                window.localStorage.setItem('user', data.user.email);
                window.localStorage.setItem('uid', data.user.uid);

                document.querySelector('.modal--tabs').classList.remove('open');
                document.querySelector('.overlay').classList.remove('visible');

                toast.show('success', 'Usuário logado com sucesso!');

            }).catch(function(error) {
                toast.show('error', handleError(error.code));

            })
        }
    };

}