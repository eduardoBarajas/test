import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    useRouteMatch,
    Route,
    useLocation,
    useHistory 
} from "react-router-dom";

import './navigation_bar.css';

// solo deben estar agregado las direcciones donde se desee modificar el color del nav.
const NavColorByPath = {
    '/Clientes/detallesProducto': 'accent-color'
}

const NavigationBar = (props) => {
    let location = useLocation();
    let history = useHistory();
    let nav_color = (NavColorByPath[location.pathname] != null) ? NavColorByPath[location.pathname] : 'default-primary-color';
    let logo_or_back_btn = (location.pathname == '/') ? <a id="logo-container" href="#" className="brand-logo">Logo</a> :
        <a className="back_button" onClick={(event) => {history.goBack()}}><i className="material-icons">arrow_back<span className="nav_bar_icon_text"> Regresar </span></i></a>;
    return (
        <nav className={nav_color} role="navigation">
            <div className="nav-wrapper container no-margin">
                {logo_or_back_btn}
                <ul className="right hide-on-med-and-down">
                    <li><a href="#">Navbar Link</a></li>
                </ul>

                <ul id="nav-mobile" className="sidenav">
                    <li><a href="#">Navbar Link</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavigationBar;