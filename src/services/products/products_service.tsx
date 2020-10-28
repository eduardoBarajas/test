import { Observable } from 'rxjs';
import axios from 'axios';
import { Product } from '../../entities/entities';
import { IProduct } from '../../entities/product';
const API = 'http://192.168.0.2:4000/products';

class ProductsService {
    
    constructor () {

    }

    getAllProducts() {
        const observable: Observable<IProduct[]> = new Observable(subscriber => {
            axios.get(`${API}/getAllProducts/`)
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
        return observable;
    }

    getProductsByIdStore(id_store: string) {
        const observable: Observable<IProduct[]> = new Observable(subscriber => {
            axios.get(`${API}/getProductsByIdStore/${id_store}`)
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
        return observable;
    }

    getProductById(product_id: string) {
        return new Observable(subscriber => {
            axios.get(`${API}/getProductById/${product_id}`)
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

    saveProduct(product: Product) {
        return new Observable(subscriber => {
            axios.post(`${API}/saveProduct`, {
                product: product
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

  export default new ProductsService();
  