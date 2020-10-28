import { Box, Tab, Tabs } from '@material-ui/core';
import React, {Component, useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";

export interface MTabsProps {
    Id: string,
    TabOptions: {to: string, label: string, icon: string}[]
}

const MTabs = (props: MTabsProps) => {
    const [tabsValue, setTabsValue] = useState(0);
    //const onTabClick = (event: React.MouseEvent<HTMLElement>, toUrl: string) => {
    //    console.log(toUrl);
        //setRedirect(toUrl);
    //}
    const onTabChange = (event: React.ChangeEvent<{}>, value: any) => {
        console.log(value);
    }
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
            return <Tab key={props.TabOptions.indexOf(option)} className={(props.TabOptions.indexOf(option) == 0) ? 'active' : ''}
                label={option.label}/>;
        });
    }
    //let tabs_classes = 'nav-content default-primary-color z-depth-4 ';
    //tabs_classes += (this.props.bottomNavigation != null) ? 'bottom_navigation' : '';
    return (
        <Box>
            {redirect != null &&
                {redirect} 
            }
            {redirect == null &&
                <Tabs aria-label="simple tabs example"
                    value={tabsValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={onTabChange}>
                    {tab_options}
                </Tabs>
            }

        </Box>
    );
}
export default MTabs;