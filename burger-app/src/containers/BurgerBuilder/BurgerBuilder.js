import React,{ Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSumary from '../../components/Burger/OrderSum/OrderSumary'
import BackDrop from '../../components/UI/BackDrop/BackDrop'
import errorHandler from '../../hoc/Errorhandler/errorHandler'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/spinner/spinner'
import * as actionTypes from '../../Store/actions'




class BurgerBuilder extends Component{
    
    state = {
        purchase:false,
        loading:false,
        error:false

    }

    componentDidMount () {
        
        // axios.get('https://react-burger-builder-5d7c9.firebaseio.com/ingredients.json')
        //      .then(response => {
        //          this.setState({
        //              ingredients: response.data
        //          })
        //      })
        //      .catch(error => {
        //          this.setState({
        //              error:true
        //          })
        //      })
    }
    
    purchaseCanceldHandle = () =>{
        this.setState({
            purchaseClicked: false
        })
    }
    purchaseContinueHandle = () =>{
        this.props.history.push({
            pathname: '/checkout',
        })
    }

    purchaseHandle = () =>{
        this.setState({
            purchaseClicked:true
        })
    }
    updatePurchaseState(ingredients) {
       
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        }).reduce((sum,el) => {
            return sum + el
        },0)

        return sum > 0
    }
   
   
    render(){
        console.log(this.props.ings)
        const disableControl = {
            ...this.props.ings
        }
        for(let key in disableControl){
            disableControl[key] = disableControl[key] <= 0
        }
        let orderSummary = null   
       
        let burger =  this.state.error ? <p>ingredients can not be loadeed...</p> : <Spinner />
        if(this.props.ings){
            burger =  ( 
                <Aux> 
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
            addIngredient={this.props.onAddIngredients }
            removeIngredient = {this.props.onRmvIngredients}
            disable={disableControl}
            price = {this.props.price}
            purchase = {this.updatePurchaseState(this.props.ings)}
            btnClicked = {this.purchaseHandle}  />
            </Aux>
        )
        orderSummary = <OrderSumary 
                            ingredients = {this.props.ings}
                            price = {this.props.price}
                            continuePurchase = {this.purchaseContinueHandle}
                            cancelPurchase = {this.purchaseCanceldHandle}
                            />
        }


        if(this.state.loading){
            orderSummary = <Spinner />
        }
        
        return(
            <Aux>
            <BackDrop display = {this.state.purchaseClicked} backdropClicked = {this.purchaseCanceldHandle}/>
            <Modal display={this.state.purchaseClicked} >
                {orderSummary}
            </Modal>
           {burger}
            </Aux>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients : (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT,ingredientsName: ingName}),
        onRmvIngredients : (ingName) => dispatch({type: actionTypes.RMV_INGREDIENT,ingredientsName: ingName})
    }
}
const mapStateToProps = state => {
    return  {
        ings : state.ingredients,
        price:  state.totalPrice
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder, axios))

