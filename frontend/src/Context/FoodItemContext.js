import { createContext, useReducer } from "react";

export const FoodItemsContext = createContext();

export const FoodItemsReducer = (state, action) => {

    switch(action.type) {
        case 'SET_FOOD_ITEMS':
            return {
                foodItems: action.payload
            }
        case 'CREATE_FOOD_ITEM':
            return {
                foodItems: [action.payload, ...state.foodItems]
            }
        case 'DELETE_FOOD_ITEM':
            return {
                foodItems: state.foodItems.filter((item) => item._id !== action.payload._id)
            }
        // add case for update
        default:
            return state
    }
}

export const FoodItemsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FoodItemsReducer, {
        foodItems: []
    })

    return (
        <FoodItemsContext.Provider value={{...state, dispatch}}>
            { children }
        </FoodItemsContext.Provider> 
    )
}