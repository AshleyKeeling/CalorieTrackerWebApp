import UpdateFoodItemFourm from "../Components/UpdateFoodItemFourm";
import { useLocation } from 'react-router-dom';

const UpdateFoodItem = () => {
    // gets food item to be updated from home page
    const location = useLocation();
    const { foodItem } = location.state || {};

    return (
        <div>
            {foodItem ? (
                <UpdateFoodItemFourm foodItem={foodItem} />
            ) : (
                <p>No food item data provided.</p>
            )}
        </div>
    )
}

export default UpdateFoodItem;