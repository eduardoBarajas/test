import React, { useEffect, useState } from 'react';
import { take } from 'rxjs/operators';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useGetStoresById } from '../../hooks/StoresHooks';
import { Container, createStyles, Fab, Grid, makeStyles, Theme } from '@material-ui/core';
import {StoresFlipCard} from '../../components/components';
import Store from '../../entities/store';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: '2em',
            paddingBottom: '5em',
            paddingLeft: '5%',
            paddingRight: '5%'
        },
        grid: {
            flexGrow: 1,
        },
        fab: {
            position: 'fixed',
            bottom: theme.spacing(10),
            right: theme.spacing(4),
        },
    })
);


const Stores = () => {
    //const [stores, setStores] = useState([]);
    let history = useHistory();
    let stores = useGetStoresById('');
    const classes = useStyles();
    useEffect(() => {
       
        
        return () => {
            // Anything in here is fired on component unmount.
            console.log("UNMOUNT: StoreStores");
            //feature_discover_btn.removeEventListener('click', (e) => { redirectByHistory(history, e) } );
        }
    }, []);
    let store_elements: JSX.Element[] = [];
    if (stores != undefined) {
        stores.forEach((store: Store) => {
            store_elements.push(
                <Grid key={store.getId} item xs={12} md={4}>
                    <Grid container justify="center" alignItems="center" spacing={1}>
                        <Grid item className="w-100">
                            <StoresFlipCard id={'card-' + store.getId} store={store} />
                        </Grid>
                    </Grid>
                </Grid>
            );
        });
    }
    console.log(stores);
    return (
        <Container maxWidth="xl" className={classes.root}>
            <Fab color="primary" className={classes.fab} aria-label="Agregar Tienda" onClick={(e) => {history.push('/Tiendas/AgregarTienda')}}>
                <AddIcon />
            </Fab>
            <Grid justify="center" alignItems="center"  container spacing={2} className={classes.grid}>
                {store_elements}
            </Grid> 
        </Container>
    );
}

export default Stores;