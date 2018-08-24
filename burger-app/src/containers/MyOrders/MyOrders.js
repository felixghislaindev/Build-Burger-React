import React, { Component } from 'react';
import Order from '../../components/Burger/OrderSum/Order'
import axios from '../../axios-orders'
import errorHandler from '../../hoc/Errorhandler/errorHandler'


class MyOrders extends Component {
    state ={
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
             .then(response => {
                 const OrdersFromBackEnd = []
                 for (let key in response.data){
                        OrdersFromBackEnd.push({
                            ...response.data[key],
                            id: key
                        })
                 }
                 this.setState({
                     orders:OrdersFromBackEnd,
                    loading: true
                 })
             })
             .catch(erro => {
                this.setState({
                    loading: false
                 })
             })
    }
    render() {
        return (
            <div>
               {
                   this.state.orders.map( order => (
                    <Order ingredients={order.ingredients}
                           price={order.totalPrice}
                           key={order.id}/>
                   ))
               }
            </div>
        );
    }
}

export default errorHandler( MyOrders, axios);