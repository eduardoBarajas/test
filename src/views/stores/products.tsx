import React, { useEffect, useState } from 'react';
import { take } from 'rxjs/operators';
import {Link, useLocation, useHistory} from "react-router-dom";
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        paddingTop: '1em',
        paddingBottom: '1em'
    },
});

const Products = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]); 
    const location_state = useLocation().state;
    let history = useHistory();
    let id_store = '';
    //if (location_state != null && location_state.store_id != null) {
    //    id_store = location_state.store_id;
    //}
    useEffect(() => {
        
       
        return () => {
            // Anything in here is fired on component unmount.
            console.log("UNMOUNT: AddStore");
        }
    }, []);

    return (
        <Container maxWidth="xl" className={classes.root}>
           
        </Container>
    );
}

export default Products;