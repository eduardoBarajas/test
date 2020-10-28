import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import ProductsService from '../../services/products/products_service';
import {ProductsGrid, SearchFilterProducts} from '../../components/components';
import {useGetProducts} from '../../hooks/ProductsHooks';

const useStyles = makeStyles({
    root: {
        paddingTop: '1em',
        paddingBottom: '1em'
    },
});

const Products = () => {
    const classes = useStyles();
    const onFilterChange = (event: Event) => {
        console.log(event);
    }
    useEffect(() => {

    }, []);

    let products = useGetProducts(undefined);
    return (
        <Container maxWidth="xl" className={classes.root}>
            <ProductsGrid products={products}/>
        </Container>
    );
}

export default Products;