import { useEffect } from "react";
import { useFoodItemContext } from "../Hooks/useFoodItemContext";
import { useAuthContext } from "../Hooks/useAuthContext";

import FoodItemDetails from "../Components/FoodItemDetails";
import AddNewFoodItemFourm from "../Components/AddNewFoodItemFourm";
import TodaysFoodSummary from "../Components/TodaysFoodSummary";


const Home = () => {
  // add react context in the future
  const { foodItems, dispatch } = useFoodItemContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFoodItems = async () => {

      const response = await fetch('/api/foodItems', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_FOOD_ITEMS', payload: json })
      }
    }

    if (user) {
      fetchFoodItems();
    }
  }, [dispatch, user]);


  return (
    <div className="row">
      <div className="col-md-4 col-sm-12">
        <h3>Add Food Item</h3>
        <AddNewFoodItemFourm key={1} />
      </div>
      <div className="col-md-8 col-sm-12 ">
        <h3 className="">Todays Summary</h3>
        {foodItems && foodItems.length > 0 ? (
          <TodaysFoodSummary />
        ) : (
          <p>No food items available.</p>
        )}

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