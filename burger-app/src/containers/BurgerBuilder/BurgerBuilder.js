import React,{ Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSumary from '../../components/Burger/OrderSum/OrderSumary'
import BackDrop from '../../components/UI/BackDrop/BackDrop'
import errorHandler from '../../hoc/Errorhandler/errorHandler'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/spinner/spinner'



const INGREDIENTS_PRICE = {
        salad: 1.5,
        meat: 2.5,
        bacon: 0.7,
        cheese: 1.5
}
class BurgerBuilder extends Component{
    
    state = {
        ingredients:null,
        totalPrice: 5,
        purchase:false,
        purchaseClicked: false,
        loading:false,
        error:false

    }

    componentDidMount () {
        
        axios.get('https://react-burger-builder-5d7c9.firebaseio.com/ingredients.json')
             .then(response => {
                 this.setState({
                     ingredients: response.data
                 })
             })
             .catch(error => {
                 this.setState({
                     error:true
                 })
             })
    }
    
    purchaseCanceldHandle = () =>{
        this.setState({
            purchaseClicked: false
        })
    }
    purchaseContinueHandle = () =>{
        // this.setState({
        //     loading:true
        // })
        // const order ={
        //     ingredients: this.state.ingredients,
        //     totalPrice: this.state.totalPrice,
        //     customer: {
        //         name:'Felix',
        //         addres: {
        //                  postcode: 'se1254',
        //                  door:'5',
        //                  county:'Depford'
        //         },
        //         email: 'felix@getorder.com',
        //     },
        //     deliveryTime: 'Asap'
        // }
        // axios.post('/orders.json',order)
        //      .then(response => {
        //          this.setState({
        //              loading:false,
        //              purchaseClicked:false
        //          })
        //      })
        //      .catch(error =>  this.setState({
        //         loading:false,
        //         purchaseClicked:false
        //     })
        // )

        //redirecting
        const queryIngredient = []

        for (let i in this.state.ingredients) {
            queryIngredient.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const joinedquery = queryIngredient.join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + joinedquery
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
        let orderSummary = null   
       
        let burger =  this.state.error ? <p>ingredients can not be loadeed...</p> : <Spinner />
        if(this.state.ingredients){
            burger =  ( 
                <Aux> 
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
            addIngredient={this.addIngredient}
            removeIngredient = {this.removeIngredients}
            disable={disableControl}
            price = {this.state.totalPrice}
            purchase = {this.state.purchase}
            btnClicked = {this.purchaseHandle}  />
            </Aux>
        )
        orderSummary = <OrderSumary 
                            ingredients = {this.state.ingredients}
                            price = {this.state.totalPrice}
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

export default errorHandler(BurgerBuilder, axios)

