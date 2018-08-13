import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems';
import SideDrawer from '../SideDrawer/SideDrawer';

const Toolbar = (props) => {
    
    return (
        <header className = {classes.Toolbar}>
        <div>menu</div>
        <Logo height = '80%'/>
        <nav className ={classes.DesktopOnly}>
   
        <NavItems />
        </nav>

        </header>
    );
};

export default Toolbar;