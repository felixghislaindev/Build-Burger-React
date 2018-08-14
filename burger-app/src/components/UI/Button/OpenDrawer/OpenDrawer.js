import React from 'react';
import classes from './OpenDrawer.css'


const OpenDrawer = (props) => {
    
    return (

        <div className={classes.DrawerToggle} onClick={props.opendrawer}>
        <div></div>
        <div></div>
        <div></div>
        </div>
       
    );
};

export default OpenDrawer;