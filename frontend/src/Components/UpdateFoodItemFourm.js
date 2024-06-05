import { useState } from "react";
import { useNavigate } from "react-router-dom";


const UpdateFoodItemFourm = ({ foodItem }) => {
    const [name, setName] = useState(foodItem.name);
    const [calorieAmount, setCalorieAmount] = useState(foodItem.calorieAmount);
    const [mealTime, setMealTime] = useState(foodItem.mealTime);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    }

    const handleSubmit = async (e) => {
        const updateFoodItem = { name, calorieAmount, mealTime };
        e.preventDefault();

        const response = await fetch('api/foodItems/' + foodItem._id, {
            method: "PATCH",
            body: JSON.stringify(updateFoodItem),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        // response check
        if (response.ok) {
            setName('');
            setCalorieAmount('');
            setMealTime('');
            setError(null);
            setEmptyFields([]);
            navigate('/');

            // dispatch({ type: 'CREATE_FOOD_ITEM', payload: json })

        } else {
            setError(json.error);
            setEmptyFields(json.emptyFields);
            console.log("error - " + json.error);
        }
    }
    return (
        <div>
            <div className="d-flex align-items-center">
                <span className="material-symbols-outlined icon mb-2 ml-2" onClick={handleBack}>
                    arrow_back
                </span>
                <h3 className="mb-2 ml-2">Update Food</h3>
            </div>


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

                <button className="btn btn-primary mt-2 mb-3">Update Food</button>

                {error && <div className="error">{error}</div>}

            </form>
        </div>
    )
}

export default UpdateFoodItemFourm;