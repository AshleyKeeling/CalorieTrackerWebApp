import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import UpdateFoodItem from './Pages/updateFoodItem';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/updateFoodItem'
              element={<UpdateFoodItem />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
