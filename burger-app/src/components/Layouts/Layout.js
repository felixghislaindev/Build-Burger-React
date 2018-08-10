import React from 'react'
import Aux from '../../hoc/Aux'
import Classes from './Layout.css'


const Layout = (props) => (
        <Aux>
                <div>Toolbar, sidDrawer, Backdrop</div>
                <main className = {Classes.Content}>
                  {props.children}
                </main>
        </Aux>
    

)

export default Layout