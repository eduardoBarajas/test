import React, { useEffect, useState } from 'react';
import { take } from 'rxjs/operators';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import {useSpring, animated} from 'react-spring';
import { useGetStoresById } from '../../hooks/StoresHooks';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        paddingTop: '1em',
        paddingBottom: '1em'
    },
});

const Orders = () => {
    //const [stores, setStores] = useState([]);
    let history = useHistory();
    const classes = useStyles();
    useEffect(() => {
       
        
        return () => {
            // Anything in here is fired on component unmount.
            console.log("UNMOUNT: StoreStores");
            //feature_discover_btn.removeEventListener('click', (e) => { redirectByHistory(history, e) } );
        }
    }, []);
    const anim_props = useSpring({opacity: 1, from: {opacity: 0}});
    return (
        <Container maxWidth="xl" className={classes.root}>
            <animated.div style={anim_props}>
                Orders
            </animated.div>
        </Container>
    );
}

export default Orders;