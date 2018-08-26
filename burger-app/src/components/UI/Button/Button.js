import React from 'react';
import classes from './Button.css'

const Button = (props) => {
    return (
       
            <button 
            disabled={props.disabled}
            onClick={props.btnclicked}
            className= {[classes.Button, classes[props.type]].join(' ')}
            >{props.children}</button>
        
    );
};

export default Button;