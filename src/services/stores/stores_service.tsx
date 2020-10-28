import { Observable } from 'rxjs';
import axios from 'axios';
import { Store } from '../../entities/entities';
import { IStore } from '../../entities/store';
const API = 'http://192.168.0.2:4000/stores';

class StoresService {
    
    constructor () {

    }

    getStoresByIdStore(id_store: string): Observable<IStore[]> {
        return new Observable(subscriber => {
            axios.get(`${API}/getStoresByIdStore`)
            .then(function (response) {
                console.log(response);
                subscriber.next(response.data);
            })
            .catch(function (error) {
                
                subscriber.error(error);
            }).finally(() => {
                subscriber.complete();
            });
        });
    }

    getStoreById(store_id: string) {
        return new Observable(subscriber => {
            axios.get(`${API}/getStoreById/${store_id}`)
            .then(function (response) {
                console.log(response);
                subscriber.next(response.data[0]);
            })
            .catch(function (error) {
                subscriber.error(error);
            }).finally(() => {
                subscriber.complete();
            });
        });
    }

    saveStore(store: Store) {
        return new Observable(subscriber => {
            axios.post(`${API}/saveStore`, {
                store: store
            }).then(function (response) {
                console.log(response);
                subscriber.next(response.data);
            }).catch(function (error) {
                subscriber.error(error);
            }).finally(() => {
                subscriber.complete();
            });
        });
    }

}

  export default new StoresService();
  