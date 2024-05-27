import { useEffect } from "react";
import { useFoodItemContext } from "../Hooks/useFoodItemContext";

import FoodItemDetails from "../Components/FoodItemDetails";
import AddNewFoodItemFourm from "../Components/AddNewFoodItemFourm";


const Home = () => {
    // add react context in the future
    const {foodItems, dispatch} = useFoodItemContext();

    useEffect(() => {
        const fetchFoodItems = async () => {

            const response = await fetch('/api/foodItems');
            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'SET_FOOD_ITEMS', payload: json})
            }
        }
        
        fetchFoodItems();
    }, [dispatch]);
    

    return(
        <div className="home">
            <div className="food-items">
                {foodItems && foodItems.map((foodItem) => (
                    <FoodItemDetails key={foodItem._id} foodItem={foodItem} />
                ))}
            </div>
            <div>
                <AddNewFoodItemFourm key={1} />
            </div>
        </div>
    )
}

export default Home;