import React, { useEffect, useState } from 'react';
import '../add_store/add_store.css';
import { take } from 'rxjs/operators';
import {StoresForm, ProductsList} from '../../../../components/components';
import {Link, useLocation, useHistory} from "react-router-dom";
import {BaseView} from '../../../views';
import ProductsService from '../../../../services/products/products_service';

const StoreProducts = (props) => {
    const [products, setProducts] = useState([]); 
    const location_state = useLocation().state;
    let history = useHistory();
    let id_store = '';
    if (location_state != null && location_state.store_id != null) {
        id_store = location_state.store_id;
    }
    useEffect(() => {
        // cargamos la tienda en el estado.
        ProductsService.getProductsByIdStore(id_store).pipe(take(1)).subscribe({
            next(products) {
                setProducts(products);
            },
            error(err) {
                console.error('(Store|Products)[StoreProducts]something wrong occurred: ' + err);
                window.M.toast({html: 'Ocurrio un problema al cargar las tiendas, intenta mas tarde', classes: 'error-toast'});
            }
        });
        const feature_discover = document.getElementById("featureDiscover");
        const instance = window.M.TapTarget.init(feature_discover);
        const redirectByHistory = (e) => {
            const location = {
                pathname: '/Tiendas/Productos/AgregarProducto',
                state: {
                    store_id: id_store
                }
            }
            history.push(location);
            e.preventDefault();
        } 
        const feature_discover_btn = document.getElementsByClassName('tap-target-origin')[0];
        // reemplazamos la funcion default del discover por que no es compatible con el router de react.
        feature_discover_btn.addEventListener('click', redirectByHistory);
        instance.open();
        setTimeout(() => {
            instance.close();
        }, 1000);
        return () => {
            // Anything in here is fired on component unmount.
            console.log("UNMOUNT: AddStore");
            feature_discover_btn.removeEventListener('click', redirectByHistory);
        }
    }, []);

    return (
        <BaseView title="Productos" content={
            <div>
                <div className="row">
                <div class="mdc-data-table">
                    <div class="mdc-data-table__table-container">
                        <table class="mdc-data-table__table" aria-label="Dessert calories">
                        <thead>
                            <tr class="mdc-data-table__header-row">
                            <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Dessert</th>
                            <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Carbs (g)</th>
                            <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Protein (g)</th>
                            <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Comments</th>
                            </tr>
                        </thead>
                        <tbody class="mdc-data-table__content">
                            <tr class="mdc-data-table__row">
                            <th class="mdc-data-table__cell" scope="row">Frozen yogurt</th>
                            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">24</td>
                            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">4.0</td>
                            <td class="mdc-data-table__cell">Super tasty</td>
                            </tr>
                            <tr class="mdc-data-table__row">
                            <th class="mdc-data-table__cell" scope="row">Ice cream sandwich</th>
                            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">37</td>
                            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">4.33333333333</td>
                            <td class="mdc-data-table__cell">I like ice cream more</td>
                            </tr>
                            <tr class="mdc-data-table__row">
                            <th class="mdc-data-table__cell" scope="row">Eclair</th>
                            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">24</td>
                            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">6.0</td>
                            <td class="mdc-data-table__cell">New filing flavor</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                <div className="fixed-action-btn">
                    <Link to={{
                            pathname: '/Tiendas/Productos/AgregarProducto',
                            state: {
                                store_id: id_store
                            }
                        }} id="btn_agregar_producto" className="btn-floating tooltipped btn-large purple floating-button-margin">
                        <i className="large material-icons">add</i>
                    </Link>
                    <div id="featureDiscover" className="tap-target dark-primary-color text-primary-color" data-target="btn_agregar_producto">
                        <div className="tap-target-content">
                        <h5>Agregar Productos</h5>
                        <p>Haz click aqui para agregar un nuevo producto.</p>
                        </div>
                    </div>
                </div> 
            </div>
        }>
        </BaseView>
    );
}

export default StoreProducts;