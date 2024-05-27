import { useState } from "react"
import { useFoodItemContext } from "../Hooks/useFoodItemContext";


const AddNewFoodItemFourm = () => {
    const { dispatch } = useFoodItemContext();

    const [name, setName] = useState('');
    const [calorieAmount, setCalorieAmount] = useState('');
    const [mealTime, setMealTime] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        // error checking


        // adding new food item to database
        const foodItem = {name, calorieAmount, mealTime};

        const response = await fetch('/api/foodItems/', {
            method: 'POST',
            body: JSON.stringify(foodItem),
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        const json = await response.json();

        // response check
        if (response.ok) {
            setName('');
            setCalorieAmount('');
            setMealTime('');
            setError(null);
            setEmptyFields([]);
            dispatch({type: 'CREATE_FOOD_ITEM', payload: json})

        } else {
            setError(json.error);
            setEmptyFields(json.emptyFields);
            console.log("error - " + json.error);
        }
    }

    return (
        <form className="AddNewFoodItemFourm" onSubmit={handleSubmit}>
            <h3>Add Food Item</h3>

            <label>Food Name</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' :  ''}
            />

            <label>Calorie Amount</label>
            <input 
                type="number"
                onChange={(e) => setCalorieAmount(e.target.value)}
                value={calorieAmount}
                className={emptyFields.includes('calorieAmount') ? 'error' : ''}
            />

            <label>Meal Time</label>
            
            <select 
                onChange={(e) => setMealTime(e.target.value)}
                value={mealTime}
                className={emptyFields.includes('mealTime') ? 'error' : ''}
            >
                <option value="" disabled>Select meal time</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select>

            <button>Add Food</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AddNewFoodItemFourm;