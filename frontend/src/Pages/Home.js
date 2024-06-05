import { useEffect } from "react";
import { useFoodItemContext } from "../Hooks/useFoodItemContext";

import FoodItemDetails from "../Components/FoodItemDetails";
import AddNewFoodItemFourm from "../Components/AddNewFoodItemFourm";


const Home = () => {
  // add react context in the future
  const { foodItems, dispatch } = useFoodItemContext();

  useEffect(() => {
    const fetchFoodItems = async () => {

      const response = await fetch('/api/foodItems');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_FOOD_ITEMS', payload: json })
      }
    }

    fetchFoodItems();
  }, [dispatch]);


  return (
    <div className="row">
      <div className="col-md-4 col-sm-12">
        <h3>Add Food Item</h3>
        <AddNewFoodItemFourm key={1} />
      </div>
      <div className="col-md-8 col-sm-12 ">
        <h3 className="">Food History</h3>
        {foodItems && foodItems.length > 0 ? (
          foodItems.map((foodItem) => (
            <FoodItemDetails key={foodItem._id} foodItem={foodItem} />
          ))
        ) : (
          <p>No food items available.</p>
        )}

      </div>
    </div>
  )
}

export default Home;