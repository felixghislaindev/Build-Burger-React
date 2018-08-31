import React, { Component } from 'react';
import { connect } from 'react-redux'
import OrderSumary from '../../components/Order/OrderSummary/OrderSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

//summary 
//cancel 
//continue


class Checkout extends Component {
   
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
                <OrderSumary ingredients={this.props.ings}
                cancelCheckout={this.cancelCheckout}
                continueCheckout={this.continueCheckout}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                component= {ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings :state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout)