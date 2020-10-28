import React from 'react';
import {useSpring, animated} from 'react-spring';
import { RouterButton} from '../../../components/components';
import {
    BrowserRouter as Router,
    Switch,
    useRouteMatch,
    Route,
    useLocation,
    Redirect
} from "react-router-dom";

import StoreOrders from './orders/store_orders';
import StoreStores from './stores/store_stores';
import AddStore from './add_store/add_store';
import StoreProducts from './products/store_products';
import AddStoreProduct from './add_product/add_product';

const DashboardStore = (props) => {
    let { path, url } = useRouteMatch();
    let location = useLocation();
    //const OrdersView = animated(Orders);
    //const tabs = <Tabs id="tabs_dashboard_tiendas" bottomNavigation="true" tab_options={[{to: `${url}/MisTiendas`, label: 'Mis Tiendas', icon: 'grade'}, {to: `${url}/Ordenes`, label: 'Mis Ordenes', icon: 'local_grocery_store'}]}/>;
    const tabs = null;
    return (
        (location.pathname == '/Tiendas') ? <Redirect to={"/Tiendas/MisTiendas"} /> :
        <div>
            <Switch>
                <Route exact path="/Tiendas/MisTiendas">
                    {tabs}
                    <StoreStores/>
                </Route>
                <Route exact path="/Tiendas/Ordenes">
                    {tabs}
                    <StoreOrders/>
                </Route>
                <Route exact path="/Tiendas/AgregarTienda">
                    <AddStore form_mode="Create"/>
                </Route>
                <Route exact path="/Tiendas/EditarTienda">
                    <AddStore form_mode="Edit"/>
                </Route>
                <Route exact path="/Tiendas/Productos">
                    <StoreProducts/>
                </Route>
                <Route exact path="/Tiendas/Productos/AgregarProducto">
                    <AddStoreProduct form_mode="Create"/>
                </Route>
            </Switch>
        </div>
    );
}

export default DashboardStore;