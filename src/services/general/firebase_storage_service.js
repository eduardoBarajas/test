import { Observable } from 'rxjs';
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyB1LKzSELcOuXiHRhdxY2fXecKyaRotM6Y",
    authDomain: "codens-18ad2.firebaseapp.com",
    databaseURL: "https://codens-18ad2.firebaseio.com",
    projectId: "codens-18ad2",
    storageBucket: "codens-18ad2.appspot.com",
    messagingSenderId: "311440713794",
    appId: "1:311440713794:web:d22301ef7ab5af1f12a5db"
};

class FirebaseStorageService {
    storage = null;
    constructor() {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this.storage = firebase.storage();
    }

    fileUpload(ref_location, filename, file) {
        return new Observable(async subscriber => {
            this.storage.ref(`${ref_location}/${filename}`).put(file).then((response) => {
                if (response.state === 'success') {
                    this.storage.ref(`${ref_location}/${filename}`).getDownloadURL().then((url) => {
                        subscriber.next({status: 'success', url: url.split('&token')[0]});
                    }).catch((error) => {
                        subscriber.error(error);
                    }).finally(() => {
                        subscriber.complete();
                    });
                }
            }).catch((err) => {
                subscriber.error(err);
            });
           
        });
    }

    fileDelete(ref_location, filename) {
        return new Observable(subscriber => {
            this.storage.ref(ref_location).child(filename).delete()
            .then((response) => {
                subscriber.next({status: 'success', message: 'Se elimino correctamente'});
            }).catch((err) => {
                subscriber.error(err);
            }).finally(() => {
                subscriber.complete();
            });
        });
    }
}

export default new FirebaseStorageService();