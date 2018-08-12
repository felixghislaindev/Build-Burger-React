import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'
const OrderSumary = (props) => {
    const ingrredientSumry = Object.keys(props.ingredients)
    .map(igkey => {
        return ( 
            <li key={igkey}>
            <span style={{textTransform: 'capitalize'}}> {igkey} </span>
            : {props.ingredients[igkey]}</li>
        )
    })
    return (
        <Aux>
        <h3>Your Order</h3>
        <p>This is the summary of your order</p>
        <ul>
        {ingrredientSumry}
        </ul>
        <p><strong>Total Price: £{props.price.toFixed(2)}</strong></p>
        <Button type = 'Danger' btnclicked = {props.cancelPurchase}>Cancel</Button>
        <Button type = 'Success' btnclicked ={props.continuePurchase}>Continue</Button>
        </Aux>
    );
};

export default OrderSumary;