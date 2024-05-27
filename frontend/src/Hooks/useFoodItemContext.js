import { useContext } from "react"
import { FoodItemsContext } from "../Context/FoodItemContext"

export const useFoodItemContext = () => {
    const context = useContext(FoodItemsContext)

    if (!context) {
        throw Error ('useFoodItemContext must be inside an FoodItemsContextProvider')
    }

    return context
}