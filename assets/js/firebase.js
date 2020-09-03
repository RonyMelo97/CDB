import Toaster from './toaster.js';

export default function Firebase(config) {

    firebase.initializeApp(config);

    function handleError(code) {
        let message;

        switch (code) {
            case 'auth/user-not-found':
                message = 'Usuário não encontrado';
                break;
            case 'auth/wrong-password':
                message = 'Senha incorreta';
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

    const toast = new Toaster();

    this.user = {

        register: (email, password) => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {

                toast.show('success', 'Usuário logado');

            }).catch(function(error) {

                toast.show('error', handleError(error.code));

            })
        },
        login: (email, password) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {

                toast.show('success', 'Usuário logado');

            }).catch(function(error) {

                toast.show('error', handleError(error.code));

            })
        }
    };
}