import React from 'react';
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import classes from './SideDrawer.css'
import BackDrop from '../../UI/BackDrop/BackDrop'
import Aux from '../../../hoc/Aux'

const SideDrawer = (props) => {
    let  attachedClasses = [classes.SideDrawer, classes.Close, classes.Open]
    if(props.open) {
        attachedClasses = [classes.SideDrawer,classes.Open]
    }

    return (
        <Aux >
        <BackDrop display  backdropClicked={props.closed}/>
        <div className= {attachedClasses.join(' ')}>
            <Logo height = '11%' margin= '32px'/>
                <nav>
                    <NavItems />
                </nav>
        </div>
        </Aux>
    );
};

export default SideDrawer;