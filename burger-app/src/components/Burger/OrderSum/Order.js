import React from 'react';
import Classes from './Order.css'

const Order = (props) => {
    const ingredients = []

    for (let ingreName in props.ingredients){
        ingredients.push({
            name: ingreName,
            amount: props.ingredients[ingreName]
        })
    }

    const output = ingredients.map(ig =>{

        return <span 
        style={{
            textTransform: 'capitalize',
            display:'inline-block',
            margin: '0 8px',
            padding: '5px',
            border: '1px solid black'

        }}
        key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={Classes.Order}>
            <p>Ingredients: {output}</p>
            <p>Ingredients: £<strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;