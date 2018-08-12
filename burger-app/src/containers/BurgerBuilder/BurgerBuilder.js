import React,{ Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSumary from '../../components/Burger/OrderSum/OrderSumary'
import BackDrop from '../../components/UI/BackDrop/BackDrop'


const INGREDIENTS_PRICE = {
        salad: 1.5,
        meat: 2.5,
        bacon: 0.7,
        cheese: 1.5
}
class BurgerBuilder extends Component{
    
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice: 5,
        purchase:false,
        purchaseClicked: false

    }
    
    purchaseCanceldHandle = () =>{
        this.setState({
            purchaseClicked: false
        })
    }
    purchaseContinueHandle = () =>{
        console.log('will continue')
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

        this.setState({purchase: sum > 0});
    }
    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const ingredientsUpdated = {
            ...this.state.ingredients
        }
        ingredientsUpdated[type] = updatedCount
        const priceAddition = INGREDIENTS_PRICE[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition

        this.setState({
            totalPrice: newPrice,
            ingredients: ingredientsUpdated
        })
        this.updatePurchaseState(ingredientsUpdated)
    }

    removeIngredients = (type) =>{
        const oldcount =  this.state.ingredients[type]
        if(oldcount <= 0){
            return;
        }
        const updatedCount = oldcount - 1
        const ingredientsUpdated = {
            ...this.state.ingredients
        }
        ingredientsUpdated[type] = updatedCount

        const priceSubstarction = INGREDIENTS_PRICE[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceSubstarction

        this.setState({
            ingredients: ingredientsUpdated,
            totalPrice: newPrice
        })
        this.updatePurchaseState(ingredientsUpdated)
    }
    render(){
        const disableControl = {
            ...this.state.ingredients
        }
        for(let key in disableControl){
            disableControl[key] = disableControl[key] <= 0
        }
        console.log(disableControl)
        
        return(
            <Aux>
            <BackDrop display = {this.state.purchaseClicked} backdropClicked = {this.purchaseCanceldHandle}/>
            <Modal display={this.state.purchaseClicked} >
            <OrderSumary 
            ingredients = {this.state.ingredients}
            price = {this.state.totalPrice}
            continuePurchase = {this.purchaseContinueHandle}
            cancelPurchase = {this.purchaseCanceldHandle}
            />
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
          
           <BuildControls 
           addIngredient={this.addIngredient}
           removeIngredient = {this.removeIngredients}
           disable={disableControl}
           price = {this.state.totalPrice}
           purchase = {this.state.purchase}
           btnClicked = {this.purchaseHandle}
           />
            </Aux>
        )
    }
}

export default BurgerBuilder