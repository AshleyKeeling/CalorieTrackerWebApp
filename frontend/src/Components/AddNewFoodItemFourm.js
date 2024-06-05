import { useState } from "react"
import { useFoodItemContext } from "../Hooks/useFoodItemContext";
import 'bootstrap/dist/css/bootstrap.min.css';



const AddNewFoodItemFourm = () => {
    const { dispatch } = useFoodItemContext();

    const [name, setName] = useState('');
    const [calorieAmount, setCalorieAmount] = useState('');
    const [mealTime, setMealTime] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // adding new food item to database
        const foodItem = { name, calorieAmount, mealTime };

        const response = await fetch('/api/foodItems/', {
            method: 'POST',
            body: JSON.stringify(foodItem),
            headers: {
                'Content-Type': 'application/json'
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
            dispatch({ type: 'CREATE_FOOD_ITEM', payload: json })

        } else {
            setError(json.error);
            setEmptyFields(json.emptyFields);
            console.log("error - " + json.error);
        }
    }

    return (
        <form className="AddNewFoodItemFourm" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Food Name</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    maxLength={40}
                    className={`form-control ${emptyFields.includes('name') ? 'is-invalid' : ''}`}
                />
            </div>

            <div className="form-group">
                <label>Calorie Amount</label>
                <input
                    type="number"
                    onChange={(e) => setCalorieAmount(e.target.value)}
                    value={calorieAmount}
                    min={0}
                    max={5000}
                    className={`form-control ${emptyFields.includes('calorieAmount') ? 'is-invalid' : ''}`}
                />
            </div>

            <div className="form-group">
                <label>Meal Time</label>
                <select
                    onChange={(e) => setMealTime(e.target.value)}
                    value={mealTime}
                    className={`form-select ${emptyFields.includes('mealTime') ? 'is-invalid' : ''}`}
                >
                    <option value="" disabled>Select meal time</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </select>
            </div>

            <button className="btn btn-primary mt-2 mb-3">Add Food</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AddNewFoodItemFourm;