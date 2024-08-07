import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useFoodItemContext } from "../Hooks/useFoodItemContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const FoodItemDetails = ({ foodItem }) => {
    const { dispatch } = useFoodItemContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    // delete food item
    const handleDelete = async () => {
        if (!user) {
            return
        }
        const response = await fetch("api/foodItems/" + foodItem._id, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_FOOD_ITEM", payload: json });
        }
    };

    // redirects user to update food item page, and passes foodItem
    const handleEdit = async () => {
        navigate('/updateFoodItem', { state: { foodItem } });
    };

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="m-0">{foodItem.name}</h4>
                <div>
                    <span
                        className="material-symbols-outlined icon mx-2"
                        onClick={handleEdit}
                    >
                        edit
                    </span>
                    <span
                        className="material-symbols-outlined icon"
                        onClick={handleDelete}
                    >
                        delete
                    </span>
                </div>
            </div>
            <p className="m-0"><strong>Calorie Amount: </strong>{foodItem.calorieAmount}</p>
            <p className="m-0"><strong>Meal Time: </strong>{foodItem.mealTime}</p>
            <p>{formatDistanceToNow(new Date(foodItem.createdAt), { addSuffix: true, })}</p>
            <hr />
        </div>
    );
};

export default FoodItemDetails;
