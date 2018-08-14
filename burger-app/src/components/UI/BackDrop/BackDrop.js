import React from 'react';
import classes from './BackDrop.css'

const BackDrop = (props) => {
   
    return (
        props.display ? <div 
        className={classes.Backdrop}
        onClick = {props.backdropClicked}
        >
            
        </div>: null
    );
};

export default BackDrop;