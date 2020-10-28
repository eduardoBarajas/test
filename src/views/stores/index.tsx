import React from 'react';
import {useSpring, animated} from 'react-spring';
import {
    BrowserRouter as Router,
    Switch,
    useRouteMatch,
    Route,
    useLocation,
    Redirect
} from "react-router-dom";
import StoreIcon from '@material-ui/icons/Store';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { MBottomNavigation, ProductsForm, StoresForm } from '../../components/components';
import Stores from './stores';
import Orders from './orders';
import Products from './products';

const useStyles = makeStyles({
    root: {
        paddingTop: '1em',
        paddingBottom: '1em'
    },
});

const IndexStore = () => {
    let { path, url } = useRouteMatch();
    let location = useLocation();
    const classes = useStyles();
    //const OrdersView = animated(Orders);
    //const tabs = <Tabs id="tabs_dashboard_tiendas" bottomNavigation="true" tab_options={[{to: `${url}/MisTiendas`, label: 'Mis Tiendas', icon: 'grade'}, {to: `${url}/Ordenes`, label: 'Mis Ordenes', icon: 'local_grocery_store'}]}/>;
    //const OrdersView = animated(ClientOrders);
    const tabs: JSX.Element = <MBottomNavigation Id="tabs_store_index" TabOptions={[{to: `${url}/MisTiendas`, label: 'Mis Tiendas', icon: <StoreIcon/>}, {to: `${url}/Ordenes`, label: 'Mis Ordenes', icon: <ListAltIcon/>}]}/>
    return (
        (location.pathname == '/Tiendas') ? <Redirect to={"/Tiendas/MisTiendas"} /> :
        <Box>
            <Switch>
                <Route exact path="/Tiendas/MisTiendas">
                    <Stores/>
                    {tabs}
                </Route>
                <Route exact path="/Tiendas/Ordenes">
                    <Orders/>
                    {tabs}
                </Route>
                <Route exact path="/Tiendas/AgregarTienda">
                    <Container maxWidth="xl" className={classes.root}>
                        <Typography variant="h5" gutterBottom>
                            {'Agregar nueva tienda'}
                        </Typography>
                        <div className="row">
                            <div className="col s12 m12">
                                <div className="card-panel">
                                    <StoresForm form_mode={'Create'}/>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Route>
                <Route exact path="/Tiendas/EditarTienda">
                    <Container maxWidth="xl" className={classes.root}>
                        <Typography variant="h4" gutterBottom>
                            {'Editar tienda'}
                        </Typography>
                        <div className="row">
                            <div className="col s12 m12">
                                <div className="card-panel">
                                    <StoresForm form_mode={'Edit'}/>
                                </div>
                            </div>
                       </div>
                    </Container>
                </Route>
                <Route exact path="/Tiendas/Productos">
                    <Products/>
                </Route>
                <Route exact path="/Tiendas/Productos/AgregarProducto">
                    <Container maxWidth="xl" className={classes.root}>
                        <Typography variant="h4" gutterBottom>
                            {'Agregar nuevo producto'}
                        </Typography>
                        <div className="row">
                            <div className="col s12 m12">
                                <div className="card-panel">
                                    <ProductsForm form_mode={'Create'}/>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Route>
            </Switch>
        </Box>
    );
}

export default IndexStore;