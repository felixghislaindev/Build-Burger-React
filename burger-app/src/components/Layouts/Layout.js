import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'



class Layout extends Component  {
        state ={
                purchaseClicked: true
        }
        closeHandle = () =>{
                this.setState=  ({
                        purchaseClicked: false
                })
        }
        render () {
                return (
                        <Aux>
                        <Toolbar/>
                        <SideDrawer closed ={this.closeHandle}/>
                         <main className = {Classes.Content}>
                           {this.props.children}
                           
                         </main>
                 </Aux>
                )
        }
}

export default Layout