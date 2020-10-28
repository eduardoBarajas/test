import React, { useEffect } from 'react';
import '../add_store/add_store.css';
import {StoresForm} from '../../../../components/components';
import {Link} from "react-router-dom";
import {BaseView} from './../../../views';
import {ProductsForm} from './../../../../components/components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    'addProductTitle': {
        marginLeft: '0.5em'
    }
});

const AddProduct = (props) => {
    useEffect(() => {
        
        return () => {
            // Anything in here is fired on component unmount.
            console.log("UNMOUNT: AddStore");
        }
    }, []);
    const classes = useStyles();
    let title = '';
    switch (props.form_mode.toUpperCase()) {
        case 'CREATE': title = 'Agregar producto'; break;
        case 'EDIT': title = 'Editar producto'; break;
    }
    return (
        <div className="container">
           <h5 className={classes.addProductTitle}>{title}</h5>
           <div className="row">
                <div className="col s12 m12">
                    <div className="card-panel">
                        <ProductsForm form_mode={props.form_mode}/>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default AddProduct;