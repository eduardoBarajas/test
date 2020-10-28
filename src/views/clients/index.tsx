import React from 'react';
import {useSpring, animated} from 'react-spring';
import {RouterButton, MTabs, MBottomNavigation} from '../../components/components';
import {
    BrowserRouter as Router,
    Switch,
    useRouteMatch,
    Route,
    useLocation,
    Redirect
} from "react-router-dom";
import ClientOrders from '../dashboards/client/orders/client_orders';
import Products from './products';
import ClientStores from '../dashboards/client/stores/client_stores';
import {ProductDetails} from  '../../components/components';
import { Box, makeStyles } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import StoreIcon from '@material-ui/icons/Store';
import ListAltIcon from '@material-ui/icons/ListAlt';

const IndexClients = () => {
    let { path, url } = useRouteMatch();
    let location = useLocation();
    const OrdersView = animated(ClientOrders);
    const tabs: JSX.Element = <MBottomNavigation Id="tabs_productos_clientes" TabOptions={[{to: `${url}/Productos`, label: 'Productos', icon: <FastfoodIcon/>}, {to: `${url}/Tiendas`, label: 'Tiendas', icon: <StoreIcon/>},
        {to: `${url}/Ordenes`, label: 'Mis Ordenes', icon: <ListAltIcon/>}]}/>
    return (
        (location.pathname == '/Clientes') ? <Redirect to={"/Clientes/Productos"} /> :
        <Box>
            <Switch>
                <Route exact path="/Clientes/Productos">
                    <Products/>
                    {tabs}
                </Route>
                <Route exact path="/Clientes/detallesProducto">
                    <ProductDetails/>
                </Route>
                <Route exact path="/Clientes/Tiendas">
                    <ClientStores/>
                    {tabs}
                </Route>
                <Route exact path="/Clientes/Ordenes">
                    <ClientOrders/>
                    {tabs}
                </Route>
            </Switch>
        </Box>
    );
}

export default IndexClients;