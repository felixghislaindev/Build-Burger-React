import React,{ Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


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
        purchase:false

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
            <Burger ingredients={this.state.ingredients}/>
          
           <BuildControls 
           addIngredient={this.addIngredient}
           removeIngredient = {this.removeIngredients}
           disable={disableControl}
           price = {this.state.totalPrice}
           purchase = {this.state.purchase}
           />
            </Aux>
        )
    }
}

export default BurgerBuilder