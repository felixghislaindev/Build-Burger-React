import React, { Component } from 'react';
import OrderSumary from '../../components/Order/OrderSummary/OrderSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

//summary 
//cancel 
//continue


class Checkout extends Component {
    state = {
        ingredients: {
            salad : 1,
            bacon: 1,
            cheese: 1,
            meat: 0,
        }
    
    }

    componentDidMount () {
       const query = new URLSearchParams(this.props.location.search) 

       const ingredients = {}

       for(let param of query.entries()){
           ingredients[param[0]] = +param[1]
           this.setState({ingredients})
       }
      
    }
    cancelCheckout = () =>{
        this.props.history.goBack();
    }
    continueCheckout = () =>{
        this.props.history.replace('checkout/contact-data')
    }

    cancelCheckout
    render() {
        return (
            <div>
                <OrderSumary ingredients={this.state.ingredients}
                cancelCheckout={this.cancelCheckout}
                continueCheckout={this.continueCheckout}
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}

export default Checkout;