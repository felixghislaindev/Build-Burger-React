import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.css'

class ContactData extends Component {
state={
    name: '',
    email:'',
    address: {
        street: '',
        posteCode:''
    }
}
    render() {
        return (
            <div className={Classes.ContactData}>
                <h4> Enter your Details</h4>
                <form>
                    <input type="text"  placeholder='Name' />
                    <input type="email" placeholder='Email ' />
                    <input type="text"  placeholder='Street'/>
                    <input type="text"  placeholder='Post code'/>
                    <Button type='Success'>Submit Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;