import React from 'react';
import logo from '../../assets/images/burger-logo.png'
import classes from'./Logo.css'

const Logo = (props) => (
    <div className={classes.Logo} style={{
        height : props.height,
        marginBottom: props.margin
    }}>
        <img src={logo} alt=""/>
        

    </div>
)

export default Logo; 