import React, {useReducer, useEffect} from 'react';
import {
    useLocation,
    useHistory 
} from "react-router-dom";

import './modal.css';

const initialState = () => {
    return {
        busy: false,
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'busy': {
            return {busy: action.busy};
        }
    }
    return state;
}

const Modal = (props) => {
    const [state, dispatch] = useReducer(reducer, undefined, initialState);
    useEffect( () => {
        const modal = document.getElementById(props.id);
        const instance = window.M.Modal.init(modal, {dismissible: false});
        if (props.isOpen) {
            instance.open();
        } else {
            instance.close();
            // por alguna razon el modal coloca un estilo al body para que no se pueda hacer scroll asi que debemos quitarlo.
            document.getElementById('body').style['overflow'] = 'auto';
        }
        return () => {
            // Anything in here is fired on component unmount.
            console.log("UNMOUNT: Modal");
        }
    }, [props.isOpen]);

    return (
        <div id={props.id} className="modal modal-component">
            <div className="modal-content">
                {props.header}
                {(props.isOpen) && props.body}
            </div>
        </div> 
    );
};
export default Modal;