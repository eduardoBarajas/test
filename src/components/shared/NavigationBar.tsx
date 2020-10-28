import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {
    BrowserRouter as Router,
    Switch,
    useRouteMatch,
    Route,
    useLocation,
    useHistory 
} from "react-router-dom";

//import './navigation_bar.css';

// solo deben estar agregado las direcciones donde se desee modificar el color del nav.
const NavColorByPath = {
    '/Clientes/detallesProducto': 'accent-color'
}

export interface NavigationBarProps {
    userLoggued?: boolean
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const NavigationBar: React.FC<NavigationBarProps> = (props: NavigationBarProps) => {
    let location = useLocation();
    let history = useHistory();
    const classes = useStyles();
    //let nav_color: string;
    //let logo_or_back_btn: ;
    //nav_color = (NavColorByPath[location.pathname] != null) ? NavColorByPath[location.pathname] : 'default-primary-color';
    //logo_or_back_btn = (location.pathname == '/') ? <a id="logo-container" href="#" className="brand-logo">Logo</a> :
    //    <a className="back_button" onClick={(event) => {history.goBack()}}><i className="material-icons">arrow_back<span className="nav_bar_icon_text"> Regresar </span></i></a>;
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavigationBar;



