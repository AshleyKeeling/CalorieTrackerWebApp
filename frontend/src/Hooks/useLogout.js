import { useAuthContext } from "./useAuthContext";
import { useFoodItemContext } from "./useFoodItemContext";

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext();
    const { dispatch: foodItemsDisptach } = useFoodItemContext();

    const logout = () => {
        // remove use from local storage (jwt token)
        localStorage.removeItem('user');

        // dispatch logout action
        authDispatch({ type: 'LOGOUT' });
        foodItemsDisptach({ type: 'SET_FOOD_ITEMS', payload: null })
    }

    return { logout }
}