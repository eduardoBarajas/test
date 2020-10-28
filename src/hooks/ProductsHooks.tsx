import { useEffect, useState } from "react";
import ProductsService from '../services/products/products_service';
import {Observable} from 'rxjs';
import { Product } from "../entities/entities";
import { IProduct } from "../entities/product";

export const useGetProducts = (id_store: string | undefined) => {
    const [products, setProducts] = useState<Product[] | undefined>();
    useEffect(() => {
        let observable: Observable<IProduct[]>;
        if (id_store != undefined) {
            observable = ProductsService.getProductsByIdStore(id_store);
        } else {
            observable = ProductsService.getAllProducts();
        }
        let subscription = observable.subscribe({
            next(products: IProduct[]) {
                setProducts(products.map((product: IProduct) => {
                    return new Product(product);
                }));
            },
            error(err) {console.log('useGetProducts error: ' + err + ' STOREID:' + id_store); setProducts(undefined)}
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);
  
    return products;
}