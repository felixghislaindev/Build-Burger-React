import React from 'react';
import classes from './Modal.css'

const Modal = (props) => {
    console.log(props.display)
    return (
        <div 
        className={classes.Modal}
        style = {{
            transform: props.display ? 'translateY(0)' : 'translateY(100vh)',
            opacity: props.display ? '1' : '0'
        }}>
           {props.children} 
        </div>
    );
};

export default Modal;