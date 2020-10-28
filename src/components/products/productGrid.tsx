import React from 'react';

import ProductCard from './productCard';
import ProductDetails from './product_details/product_details';
import Home from '../../views/general/home';
import { Product } from '../../entities/entities';
import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';

export interface ProductListProps  {
    products: Product[] | undefined
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    }
  }),
);
const ProductGrid = (props: ProductListProps) => {
    console.log(props);
    const classes = useStyles();
    let food_img = 'https://i.pinimg.com/originals/eb/53/b5/eb53b5b9282e4c3a594025eb5029e0c4.jpg';
    let products: JSX.Element[] = [];
    if (props.products != undefined)
        props.products.forEach((product: Product) => {
            products.push(
                <Grid key={product.id} item xs={6} md={3}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item>
                            <ProductCard product={product} />
                        </Grid>
                    </Grid>
                </Grid>
            );
        });
    
    return (
        <Grid container className={classes.root} spacing={2}>
           {products}
        </Grid>  
    );
}

export default ProductGrid;