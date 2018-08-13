import React from 'react';
import classes from './Navitems.css'
import NavItem from './NavItem/NavItem'

const NavItems = () => (
    <ul className={classes.NavItems}>
        <NavItem link = '/' active >Burger Builder</NavItem>
        <NavItem link = '/' active ={false} >CheckOut</NavItem>
    </ul>
)

export default NavItems;