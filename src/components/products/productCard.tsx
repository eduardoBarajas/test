import React from 'react';

import { Product } from '../../entities/entities';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';

export interface ProductCardProps  {
    product: Product | undefined
}
const CARD_COLORS = ['blue', 'orange', 'dark', 'purple', 'green'];

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

const ProductCard = (props: ProductCardProps) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="http://www.pngall.com/wp-content/uploads/5/Serving-Food-PNG-Image-HD.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;