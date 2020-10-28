import React from 'react';
import './splash.css';
import delivery_icon from '../../assets/images/delivery_man.png';

const Splash = (props) => {
    let timer = setTimeout(() => {
        clearTimeout(timer);
        props.onLoadingComplete(false);
    }, 1000);
    return (
        <div className="splash-screen default-primary-color  text-primary-color">
            <img alt="Icono de hombre haciendo una entrega" className="splash-screen-logo" src={delivery_icon}></img>
            Por favor espera un momento en lo que carga la app.
            <div className="loading-dot">.</div>
        </div>
    );
}

export default Splash;