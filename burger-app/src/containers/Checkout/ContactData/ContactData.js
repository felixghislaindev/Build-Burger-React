import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/spinner/spinner'

class ContactData extends Component {
state={
    name: '',
    email:'',
    address: {
        street: '',
        posteCode:''
    },
    loading:false
}

orderHandler = (event) =>{
    event.preventDefault()
    this.setState({
                loading:true
            })
            const order ={
                ingredients: this.props.ingredients,
                totalPrice: this.props.totalPrice,
                customer: {
                    name:'FelixxS',
                    addres: {
                             postcode: 'se1254',
                             door:'5',
                             county:'Depford'
                    },
                    email: 'felix@getorder.com',
                },
                deliveryTime: 'Asap'
            }
            axios.post('/orders.json',order)
                 .then(response => {
                     
                    this.setState({
                        loading:false
                    })
                    this.props.history.push('/')
                 })
                 .catch(error => { this.setState({
                    loading:false
                })}
            )
            
    }

    render() {
        let form = (
            <form>
            <input type="text"  placeholder='Name' />
            <input type="email" placeholder='Email ' />
            <input type="text"  placeholder='Street'/>
            <input type="text"  placeholder='Post code'/>
            <Button type='Success' btnclicked={this.orderHandler}>Submit Order</Button>
        </form>
        )
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={Classes.ContactData}>
                <h4> Enter your Details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;