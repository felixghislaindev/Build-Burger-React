import React, { Component } from 'react';
import OrderSumary from '../../components/Order/OrderSummary/OrderSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

//summary 
//cancel 
//continue


class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    
    }

    componentWillMount () {
       const query = new URLSearchParams(this.props.location.search) 

       const ingredients = {}
       let price = 0
       for(let param of query.entries()){
           

           if(param[0] === 'price'){
                price = param[1]
           } else{
            ingredients[param[0]] = +param[1]
           }
           this.setState({ingredients, totalPrice: price})
          
       }
      
      
    }
    cancelCheckout = () =>{
        this.props.history.goBack();
    }
    continueCheckout = () =>{
        this.props.history.replace('checkout/contact-data')
        console.log(this.state.ingredients)
    }  

    cancelCheckout
    render() {
        return (
            <div>
                <OrderSumary ingredients={this.state.ingredients}
                cancelCheckout={this.cancelCheckout}
                continueCheckout={this.continueCheckout}
                />
                <Route path={this.props.match.path + '/contact-data'} render={ (props) => (<ContactData 
                    ingredients={this.state.ingredients} 
                    totalPrice = {this.state.totalPrice}
                    {...props}/>)} />
            </div>
        );
    }
}

export default Checkout;