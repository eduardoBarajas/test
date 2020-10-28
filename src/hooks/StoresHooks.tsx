import { useEffect, useState } from "react";
import StoresService from '../services/stores/stores_service';
import {Observable} from 'rxjs';
import { Store } from "../entities/entities";
import { IStore } from "../entities/store";

export const useGetStoresById = (id_store: string) => {
    const [stores, setStores] = useState<Store[] | undefined>();
    useEffect(() => {
        let observable: Observable<IStore[]>;
        observable = StoresService.getStoresByIdStore(id_store);
        let subscription = observable.subscribe({
            next(stores: IStore[]) {
                setStores(stores.map((store: IStore) => {
                    return new Store(store);
                }));
            },
            error(err) {console.log('useGetProducts error: ' + err + ' STOREID:' + id_store); setStores(undefined)}
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    return stores;
}