import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems';
import OpenDrawer from '../../UI/Button/OpenDrawer/OpenDrawer'


const Toolbar = (props) => {
    
    return (
        <header className = {classes.Toolbar}>
        <OpenDrawer closedState={props.closed} opendrawer={props.open}>Menu</OpenDrawer>
        <Logo height = '80%'/>
        <nav className ={classes.DesktopOnly}>
   
        <NavItems />
        </nav>

        </header>
    );
};

export default Toolbar;