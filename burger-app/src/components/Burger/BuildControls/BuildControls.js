import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './Buildcontrol/BuildControl'
const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Cheese', type: 'cheese'},
    {label:'Meat', type: 'meat'},
]

const BuildControls = (props) => {
    
    return (
        <div className={classes.BuildControls}>
        <p>Current Price: <strong>£{props.price.toFixed(2)}</strong></p>
            {
                controls.map (ctrl => <BuildControl key ={ctrl.label} 
                ingredienLabel={ctrl.label}
                
                add={() => props.addIngredient(ctrl.type)}
                remove ={() => props.removeIngredient(ctrl.type)}
                disableControl = {props.disable[ctrl.type]}/>
            )}
            <button 
            className={classes.OrderButton}
            disabled = {!props.purchase}
            onClick = {props.btnClicked}
            >Order Now</button>
            
        </div>
    );
};

export default BuildControls;