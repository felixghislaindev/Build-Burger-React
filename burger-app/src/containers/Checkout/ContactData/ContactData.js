import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/spinner/spinner'
import InputEl from '../../../components/UI/Input/Input'

class ContactData extends Component {
state={
    orderForm: {
        name: {
            elType: 'input',
            elConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            validation: {
                required: true
            },
            value: '',
            valid: false,
            touched:false
        },
        postCode: {
            elType: 'input',
            elConfig: {
                type: 'text',
                placeholder: 'PostCode'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            touched:false,
            valid: false,
            
        },
        county: {
            elType: 'input',
            elConfig: {
                type: 'text',
                placeholder: 'County'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched:false
        },
        email: {
            elType: 'input',
            elConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            }, 
            valid: false,
            touched:false
        },
        deliveryTime: {
            elType: 'select',
            elConfig: {
                options: [
                    {value: 'Asap',displayValue: 'Asap'},
                    {value: '10 min',displayValue: '10 min'},
                    {value: '30 min',displayValue: '30 min'} ]
                
            },
            validation: {
                required: true
            }, 
            value: 'Asap',
            valid: true, 
            

        }
        
    },
    loading:false,
    validForm: false
}

validatonChekingHandler (value, rules){

    let isValid = true;
    if(rules.required){
        isValid = value.trim() !== '' && isValid
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid
    }
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid
    }
    return isValid
}
inputChangedHandler = (event, inputIdent) => {
 const updatedOrder = {
     ...this.state.orderForm
 }
 const updatedFomEl = {
     ...updatedOrder[inputIdent]
    }
    updatedFomEl.value = event.target.value
    
    updatedFomEl.valid = this.validatonChekingHandler(updatedFomEl.value, updatedFomEl.validation)
    updatedFomEl.touched = true
    let formValidated = true
    for (let inputs in updatedOrder){
        formValidated = updatedOrder[inputs].valid && formValidated 
       
    }
    updatedOrder[inputIdent] = updatedFomEl
    this.setState({
        orderForm: updatedOrder,
        validForm :formValidated 
    })
    
 
}
orderHandler = (event) =>{
    event.preventDefault()
    this.setState({
                loading:true
            })
            const customerData = {};
            for (let formElId in this.state.orderForm) {
                customerData[formElId] = this.state.orderForm[formElId].value
            }
            const order ={
                customerinfo : customerData,
                ingredients : this.props.ings,
                totalPrice : this.props.price
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
        const fomrEleArr = []
        for (let key in this.state.orderForm){
            fomrEleArr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit = {this.orderHandler}>
            
           { fomrEleArr.map( el => (
               
            <InputEl key ={el.id}
                    elType={el.config.elType} 
                    elConfig={el.config.elConfig} 
                    elValue={el.config.value} 
                    changed={(event) => this.inputChangedHandler(event, el.id)}
                    invalid={!el.config.valid}
                    shouldvalidate ={el.config.validation}
                    touched={el.config.touched}
                    />
                   
           )
                )}
            <Button type='Success' btnclicked={this.orderHandler}
            disabled={!this.state.validForm}>Submit Order</Button>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData) 