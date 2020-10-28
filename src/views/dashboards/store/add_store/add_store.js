import React, { useEffect } from 'react';
import '../add_store/add_store.css';
import {StoresForm} from '../../../../components/components';
import {Link} from "react-router-dom";

const AddStore = (props) => {
    useEffect(() => {
        
        return () => {
            // Anything in here is fired on component unmount.
            console.log("UNMOUNT: AddStore");
        }
    }, []);

    let title = '';
    switch (props.form_mode.toUpperCase()) {
        case 'CREATE': title = 'Agregar nueva tienda'; break;
        case 'EDIT': title = 'Editar tienda'; break;
    }
    return (
        <div className="container">
           <h5 className="addStoreTitle">{title}</h5>
           <div className="row">
                <div className="col s12 m12">
                    <div className="card-panel">
                        <StoresForm form_mode={props.form_mode}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStore;