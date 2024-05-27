import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useFoodItemContext } from '../Hooks/useFoodItemContext'

const FoodItemDetails = ({foodItem}) => {
    const { dispatch } = useFoodItemContext();
    
    // delete food item
    const handleDelete = async() => {
        const response = await fetch('api/foodItems/' + foodItem._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_FOOD_ITEM', payload: json})
        }
    }


    return(
        <div className="food-item-details">
            <h4>{foodItem.name}</h4>        
            <p><strong>Calorie Amount: </strong>{foodItem.calorieAmount}</p>
            <p><strong>Meal Time: </strong>{foodItem.mealTime}</p>
            <p>created at: {foodItem.createdAt}</p>
            <p>{formatDistanceToNow(new Date(foodItem.createdAt), { addSuffix : true })}</p>

            <span className="material-symbols-outlined icon" onClick={handleDelete}>delete</span>
        </div>
    )
}

export default FoodItemDetails;