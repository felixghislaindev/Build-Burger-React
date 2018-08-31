import * as actionTypes from './actions'

const initialState =  {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    
    totalPrice : 4
}
const INGREDIENTS_PRICE = {
    salad: 1.5,
    meat: 2.5,
    bacon: 0.7,
    cheese: 1.5
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: 
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientsName] : state.ingredients[action.ingredientsName] + 1
            },
            totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientsName]

        }
        case actionTypes.RMV_INGREDIENT: 
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientsName] : state.ingredients[action.ingredientsName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientsName]
        }
        default: return state 
    }
}

export default reducer