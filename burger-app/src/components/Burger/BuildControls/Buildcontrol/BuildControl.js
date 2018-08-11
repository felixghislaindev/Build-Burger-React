import React from 'react';
import classes from './BuildControl.css'
const BuildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.ingredienLabel}</div>
            <button 
            className={classes.More} 
            onClick = {props.add}
            
            >
            Add</button>
            <button 
            className={classes.Less} 
            onClick = {props.remove} 
            disabled = {props.disableControl}
            >Remove </button>
        </div>
    );
};

export default BuildControl;