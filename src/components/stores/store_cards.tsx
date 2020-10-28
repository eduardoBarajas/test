import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, createStyles, Divider, IconButton, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import React, {Component, useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import { Store } from '../../entities/entities';
import { useSpring, animated as a } from 'react-spring';
import { makeStyles } from '@material-ui/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: '60%',
      backgroundSize: 'contain',
      margin: '1em'
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    verificadoChip: {
      marginTop: '0.25em',
      marginBottom: '0.25em',
      marginRight: '0.25em'
    },
    activoChip: {
      marginTop: '0.25em',
      marginBottom: '0.25em'
    }
  }),
);

export interface StoresFlipCardProps {
    id: string,
    store: Store
}

const StoresFlipCard = (props: StoresFlipCardProps) => {
    const [flipped, set] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    });
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {props.store.getName}
                    </Typography>
                    <Chip
                      className={classes.verificadoChip}
                      variant="outlined"
                      size="small"
                      avatar={<Avatar>V</Avatar>}
                      label={(props.store.getVerified) ? 'Verificado' : 'No verificado'}
                      color={(props.store.getVerified) ? 'primary' : 'default'}
                    />
                    <Chip
                      className={classes.activoChip}
                      variant="outlined"
                      size="small"
                      avatar={<Avatar>A</Avatar>}
                      label={(props.store.getActive) ? 'Activo' : 'No activo'}
                      color={(props.store.getActive) ? 'primary' : 'default'}
                    />
                    <Typography variant="subtitle1" color="textSecondary">
                        Mac Miller
                    </Typography>
                </CardContent>
                <Divider variant="middle" />
                <div className={classes.controls}>
                    <Button color="secondary">Editar</Button>
                    <Button color="secondary">Productos</Button>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={'https://cdn.freebiesupply.com/logos/large/2x/wetransfer-logo-png-transparent.png'}
                title="Logo tienda"
            />
        </Card>
    );
}





export {StoresFlipCard};