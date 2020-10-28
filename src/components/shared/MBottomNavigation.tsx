import { BottomNavigation, BottomNavigationAction, Box, SvgIconTypeMap, Tab, Tabs } from '@material-ui/core';
import React, {Component, useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

const useStyles = makeStyles({
    bottom_navigation: {
      overflow: 'hidden',
      zIndex: 1,
      position: 'fixed',
      bottom: 0,
      width: '100%'
    },
});

export interface MBottomNavigationProps {
    Id: string,
    TabOptions: {to: string, label: string, icon: JSX.Element}[]
}

const MBottomNavigation = (props: MBottomNavigationProps) => {
    const classes = useStyles();
    const [optionSelected, setOptionSelected] = useState('');
    const history = useHistory();
    //const onTabClick = (event: React.MouseEvent<HTMLElement>, toUrl: string) => {
    //    console.log(toUrl);
        //setRedirect(toUrl);
    //}
    const handleChange = (event: React.ChangeEvent<{}>, newView: string) => {
        console.log(newView);
        history.push({pathname: newView});
        setOptionSelected(newView);
    };
    useEffect(() => {
        
        return () => {

        }
    }, []);
    
    //let redirect = (redirectTo != '') ? <Redirect to={redirectTo} /> : null;
    let redirect = null;
    // generamos los links a partir del arreglo de opciones.
    let tab_options: JSX.Element[] = [];
    if (props.TabOptions != null) {
        tab_options = props.TabOptions.map((option) => {
            if (optionSelected == '' && props.TabOptions.indexOf(option) == 0) 
                setOptionSelected(option.to);
            return <BottomNavigationAction value={option.to} key={props.TabOptions.indexOf(option)} className={(optionSelected == option.to) ? 'active' : ''}
                label={option.label} icon={option.icon}/>;
        });
    }
    //let tabs_classes = 'nav-content default-primary-color z-depth-4 ';
    //tabs_classes += (this.props.bottomNavigation != null) ? 'bottom_navigation' : '';
    return (
        <Box>
            <BottomNavigation
                    value={optionSelected}
                    onChange={handleChange}
                    className={classes.bottom_navigation}
                >
                    {tab_options}
            </BottomNavigation>
        </Box>
    );
}
export default MBottomNavigation;