import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'



class Layout extends Component  {
        state ={
                showSideDrawer: false
        }
        openAndCloseHandler = () =>{
              this.setState((prevState) => ({showSideDrawer: !prevState.showSideDrawer}))
              
        }
   

        render () {
                return (
                        <Aux>
                        <Toolbar closed={this.state.showSideDrawer} open={this.openAndCloseHandler}/>
                        <SideDrawer open={this.state.showSideDrawer} close={this.openAndCloseHandler}/>
                         <main className = {Classes.Content}>
                           {this.props.children}
                           
                         </main>
                 </Aux>
                )
        }
}

export default Layout