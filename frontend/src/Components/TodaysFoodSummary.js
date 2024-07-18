import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';
import { useFoodItemContext } from "../Hooks/useFoodItemContext";



const TodaysFoodSummary = () => {
    const [breakfastAmount, setBreakfastAmount] = useState('0');
    const [lunchAmount, setLunchAmount] = useState('0');
    const [dinnerAmount, setDinnerAmount] = useState('0');
    const [snackAmount, setSnackAmount] = useState('0');
    const [todaysItemsAmount, setTodaysItemsAmount] = useState('0');

    // gets fooditems from foodItemContext
    const { foodItems } = useFoodItemContext();

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {

        // gets todays items
        if (foodItems) {
            const todaysItems = foodItems.filter(item => new Date(item.createdAt).toISOString().split('T')[0] === today);
            // sorts foodItems by meal type and adds the calories to that meal type
            const breakfastCalories = todaysItems
                .filter(item => item.mealTime === 'Breakfast')
                .reduce((total, item) => total + item.calorieAmount, 0);

            const lunchCalories = todaysItems
                .filter(item => item.mealTime === 'Lunch')
                .reduce((total, item) => total + item.calorieAmount, 0);

            const dinnerCalories = todaysItems
                .filter(item => item.mealTime === 'Dinner')
                .reduce((total, item) => total + item.calorieAmount, 0);

            const snackCalories = todaysItems
                .filter(item => item.mealTime === 'Snack')
                .reduce((total, item) => total + item.calorieAmount, 0);

            setBreakfastAmount(breakfastCalories);
            setLunchAmount(lunchCalories);
            setDinnerAmount(dinnerCalories);
            setSnackAmount(snackCalories);
            setTodaysItemsAmount(todaysItems.length);
        }
    })
    return (

        <div>
            {todaysItemsAmount == 0 ? (
                <p>No Food Eaten Today.</p>

            ) : (
                <div className='row'>
                    <div className='col-6'>
                        <h4>Calories</h4>
                        <PieChart
                            colors={['#000000', '#2F4550', '#586F7C', '#B8DBD9']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: breakfastAmount, label: 'Breakfast - ' + breakfastAmount },
                                        { id: 1, value: lunchAmount, label: 'Lunch - ' + lunchAmount },
                                        { id: 2, value: dinnerAmount, label: 'Dinner - ' + dinnerAmount },
                                        { id: 3, value: snackAmount, label: 'Snack - ' + snackAmount },
                                    ],
                                    cornerRadius: 5
                                },
                            ]}
                            width={450}
                            height={200}
                        />
                    </div>
                    <div className='col-6'>
                        <h4>Macros</h4>
                        <PieChart
                            colors={['#818D92', '#586A6A', '#B9A394', '#D4C5C7', '#DAD4EF']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: breakfastAmount, label: 'Protein - ' + breakfastAmount },
                                        { id: 1, value: lunchAmount, label: 'Carbs - ' + lunchAmount },
                                        { id: 2, value: dinnerAmount, label: 'Fat - ' + dinnerAmount },
                                        { id: 3, value: snackAmount, label: 'Fiber - ' + snackAmount },
                                        { id: 4, value: snackAmount, label: 'Sugar - ' + snackAmount },
                                    ],
                                    cornerRadius: 5
                                },
                            ]}
                            width={450}
                            height={200}
                        />
                    </div>
                </div>
            )}


        </div>
    )
}

export default TodaysFoodSummary;