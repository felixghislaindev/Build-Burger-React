import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import Classes from './OrderSum.css'

const OrderSummary = (props) => {
    return (
        <div className={Classes.OrderSumary}>
            <h1>This is you Burger enjoy!</h1>
        <div style={{width: '100%',margin:'auto'}}>
        <Burger ingredients={props.ingredients}/>
        </div>

        <Button type='Danger' btnclicked={props.cancelCheckout}>Cancel</Button>
        <Button type='Success' btnclicked={props.continueCheckout}>Continue</Button>
        </div>
    );
};

export default OrderSummary;